<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\User;

use Bican\Roles\Models\Role;

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

    public function postRoles(Request $request) {
        $role = array(
            'role' => $request->input('role'),
            'slug' => $request->input('slug'),
            'description' => $request->input('description')
        );

        return response()->success(compact('role'));
    }
}
