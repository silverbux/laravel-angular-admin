<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\User;
use Bican\Roles\Models\Role;
use Bican\Roles\Models\Permission;
use Input;
use Auth;
use Hash;
use Validator;

class UserController extends Controller
{
    public function getMe()
    {
        $user = Auth::user();

        return response()->success($user);
    }

    public function putMe(Request $request)
    {
        $user = Auth::user();

        $this->validate($request, [
            'data.name' => 'required|min:3',
            'data.email' => 'required|email|unique:users,email,'.$user->id
        ]);

        $userForm = app('request')
                    ->only(
                        'data.current_password',
                        'data.new_password',
                        'data.new_password_confirmation',
                        'data.name',
                        'data.email'
                    );

        $userForm = $userForm['data'];
        $user->name = $userForm['name'];
        $user->email = $userForm['email'];

        if ($request->has('data.current_password')) {
            Validator::extend('hashmatch', function ($attribute, $value, $parameters) {
                return Hash::check($value, Auth::user()->password);
            });

            $rules = [
                'data.current_password' => 'required|hashmatch:data.current_password',
                'data.new_password' => 'required|min:8|confirmed',
                'data.new_password_confirmation' => 'required|min:8',
            ];

            $payload = app('request')->only('data.current_password', 'data.new_password', 'data.new_password_confirmation');

            $messages = array(
                'hashmatch' => 'Invalid Password',
            );

            $validator = app('validator')->make($payload, $rules, $messages);

            if ($validator->fails()) {
                return response()->error($validator->errors());
            } else {
                $user->password = Hash::make($userForm['new_password']);
            }
        }

        $user->save();

        return response()->success('success');
    }

    /**
     * Get all users
     *
     * @return JSON
     */
    public function getIndex()
    {
        $users = User::all();
        return response()->success(compact('users'));
    }

    /**
     * Get user details referenced by id
     *
     * @param Integer User ID
     *
     * @return JSON
     */
    public function getShow($id)
    {
        $user = User::find($id);
        $user['role'] = $user
                        ->roles()
                        ->select(array('slug','roles.id','roles.name'))
                        ->get();
        return response()->success($user);
    }

    /**
     * Update user data
     *
     * @return JSON success message
     */
    public function putShow()
    {
        $userForm = Input::get('data');
        $userId = intval($userForm['id']);

        $userData = array(
            'name' => $userForm['name'],
            'email' => $userForm['email']
        );

        $affectedRows = User::where('id', '=', $userId)->update($userData);

        $user = User::find($userId);
        $user->detachAllRoles();

        foreach (Input::get('data.role') as $setRole) {
            $user->attachRole($setRole);
        }

        return response()->success('success');
    }

    /**
     * Responds to requests to GET /users/admin-profile
     */
    public function getAdminProfile()
    {
        //
    }

    /**
     * Responds to requests to POST /users/profile
     */
    public function postProfile()
    {
        //
    }

    public function deleteUser($id)
    {
        return response()->success(compact('id'));
    }

    /**
     * Get all user roles
     *
     * @return JSON
     */
    public function getRoles()
    {
        $roles = Role::all();
        return response()->success(compact('roles'));
    }

    /**
     * Get role details referenced by id
     *
     * @param Integer Role ID
     *
     * @return JSON
     */
    public function getRolesShow($id)
    {
        $role = Role::find($id);

        $role['permissions'] = $role
                        ->permissions()
                        ->select(array('permissions.name','permissions.id'))
                        ->get();

        return response()->success($role);
    }

    /**
     * Update role data and assign permission
     *
     * @return JSON success message
     */
    public function putRolesShow()
    {
        $roleForm = Input::get('data');
        $roleData = array(
            'name' => $roleForm['name'],
            'slug' => $roleForm['slug'],
            'description' => $roleForm['description']
        );

        $roleForm['slug'] = str_slug($roleForm['slug'], ".");
        $affectedRows = Role::where('id', '=', intval($roleForm['id']))->update($roleData);
        $role = Role::find($roleForm['id']);

        $role->detachAllPermissions();

        foreach (Input::get('data.permissions') as $setPermission) {
            $role->attachPermission($setPermission);
        }

        return response()->success('success');
    }

    /**
     * Create new user role
     *
     * @return JSON
     */
    public function postRoles()
    {
        $role = Role::create([
            'name' => Input::get('role'),
            'slug' => str_slug(Input::get('slug'), "."),
            'description' => Input::get('description')
        ]);

        return response()->success(compact('role'));
    }

    /**
     * Delete user role referenced by id
     *
     * @param Integer Role ID
     *
     * @return JSON
     */
    public function deleteRoles($id)
    {
        Role::destroy($id);
        return response()->success('success');
    }

    /**
     * Get all system permissions
     *
     * @return JSON
     */
    public function getPermissions()
    {
        $permissions = Permission::all();
        return response()->success(compact('permissions'));
    }

    /**
     * Create new system permission
     *
     * @return JSON
     */
    public function postPermissions()
    {
        $permission = Permission::create([
            'name' => Input::get('name'),
            'slug' => str_slug(Input::get('slug'), "."),
            'description' => Input::get('description')
        ]);

        return response()->success(compact('permission'));
    }

    /**
     * Get system permission referenced by id
     *
     * @param Integer Permission ID
     *
     * @return JSON
     */
    public function getPermissionsShow($id)
    {
        $permission = Permission::find($id);

        return response()->success($permission);
    }

    /**
     * Update system permission
     *
     * @return JSON
     */
    public function putPermissionsShow()
    {
        $permissionForm = Input::get('data');
        $permissionForm['slug'] = str_slug($permissionForm['slug'], ".");
        $affectedRows = Permission::where('id', '=', intval($permissionForm['id']))->update($permissionForm);

        return response()->success($permissionForm);
    }

    /**
     * Delete system permission referenced by id
     *
     * @param Integer Permission ID
     *
     * @return JSON
     */
    public function deletePermissions($id)
    {
        Permission::destroy($id);
        return response()->success('success');
    }
}
