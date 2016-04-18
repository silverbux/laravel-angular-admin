<?php

namespace App\Http\Controllers;

use App\Post;
use App\Http\Requests;
use Illuminate\Http\Request;


class PostsController extends Controller
{
    public function create(Request $request) {
        $this->validate($request, [
            'name'  => 'required|string',
            'topic' => 'required|string',
        ]);

        $post = new Post;
        $post->name = $request->input('name');
        $post->topic = $request->input('topic');
        $post->save();

        return response()->success(compact('post'));
    }
}
