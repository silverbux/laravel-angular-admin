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
        //
    }

    /**
     * Responds to requests to GET /users/show/1
     */
    public function getShow($id)
    {
        //
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

    public function getRoles()
    {
        $roles = Role::all();
        return response()->success(compact('roles'));
    }

    public function getRolesShow($id)
    {
        $role = Role::find($id);

        return response()->success($role);
    }

    public function putRolesShow()
    {
        $roleForm = Input::get('data');
        $roleForm['slug'] = str_slug($roleForm['slug'], ".");
        $affectedRows = Role::where('id', '=', intval($roleForm['id']))->update($roleForm);

        return response()->success($roleForm);
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
