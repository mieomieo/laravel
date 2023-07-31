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
        // dd($request);
        $input = $request->all();
        // dd($input);
        $post = Post::create($input);
        return response()->json($post);
    }
    public function delete($postId)
    {
        $deletedPost = Post::find($postId)->delete();
        return response()->json($deletedPost);
    }
    public function update($postId, Request $request)
    {
        $item = Post::find($postId);
        
        if (!$item) {
            return response()->json(['message' => 'item not found'], 404);
        }
        
        $item = $updatedPost;
        $item->save();

        return response()->json($item);
    }
}
