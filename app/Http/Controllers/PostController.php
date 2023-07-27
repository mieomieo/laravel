<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Post;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::all();
        return response()->json($posts);
    }
    public function store(Request $request){

        $input = $request->all();
        // dd($input);
        $post = Post::create($input);
        return response()->json($post);
    }
    public function delete($post)
    {
        $deletedPost = Post::find($post)->delete();
        return response()->json($deletedPost);
    }
}
