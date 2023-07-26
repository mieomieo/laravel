<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;

class PostController extends Controller
{
    public function store(Request $request){
        $validatedData = $request->validate([
            'title' => 'required|max:255',
            'content' => 'required',
            'date' => 'required',
        ]);
        $input = $request->all();

        $post = Post::create($ $validatedData);
        return response()->json($post);

    }
}
