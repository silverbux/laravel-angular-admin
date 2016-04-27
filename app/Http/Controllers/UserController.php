<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\User;

use Bican\Roles\Models\Role;

class UserController extends Controller
{
    public function getRoles(Request $request)
    {
        // $this->validate($request, [
        //     'name'  => 'required|string',
        //     'topic' => 'required|string',
        // ]);

        // $post = new Post;
        // $post->name = $request->input('name');
        // $post->topic = $request->input('topic');
        // $post->save();

        $roles = Role::all();
        // return '[{"id":1,"name":"Admin","slug":"admin","description":"","level":"1","created_at":"2016-04-21 03:13:14","updated_at":"2016-04-21 03:13:14"}]';
        // return $roles;
        return response()->success(compact('roles'));
    }
}
