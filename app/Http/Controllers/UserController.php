<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\User;

use Bican\Roles\Models\Role;

use Bican\Roles\Models\Permission;

use Input;

class UserController extends Controller
{
    /**
     * Responds to requests to GET /users
     */
    public function getIndex()
    {
        $users = User::all();
        return response()->success(compact('users'));
    }

    /**
     * Responds to requests to GET /users/show/1
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

    public function deleteUser($id) {
        return response()->success(compact('id'));
    }

    public function getRoles()
    {
        $roles = Role::all();
        return response()->success(compact('roles'));
    }

    public function getRolesShow($id)
    {
        $role = Role::find($id);

        $role['permissions'] = $role
                        ->permissions()
                        ->select(array('permissions.name','permissions.id'))
                        ->get();

        return response()->success($role);
    }

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

    public function postRoles() {
        $role = Role::create([
            'name' => Input::get('role'),
            'slug' => str_slug(Input::get('slug'), "."),
            'description' => Input::get('description')
        ]);

        return response()->success(compact('role'));
    }

    public function deleteRoles($id) {
        Role::destroy($id);
        return response()->success('success');
    }

    public function getPermissions()
    {
        $permissions = Permission::all();
        return response()->success(compact('permissions'));
    }

    public function postPermissions() {
        $permission = Permission::create([
            'name' => Input::get('name'),
            'slug' => str_slug(Input::get('slug'), "."),
            'description' => Input::get('description')
        ]);

        return response()->success(compact('permission'));
    }

    public function getPermissionsShow($id)
    {
        $permission = Permission::find($id);

        return response()->success($permission);
    }

    public function putPermissionsShow()
    {
        $permissionForm = Input::get('data');
        $permissionForm['slug'] = str_slug($permissionForm['slug'], ".");
        $affectedRows = Permission::where('id', '=', intval($permissionForm['id']))->update($permissionForm);

        return response()->success($permissionForm);
    }

    public function deletePermissions($id) {
        Permission::destroy($id);
        return response()->success('success');
    }
}
