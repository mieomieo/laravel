<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Post;

class PostController extends Controller
{
    public function store(Request $request){
  
        $post = Post::create(['title' => 'John','content'=>"sg","date"=>124]);

        // Return the newly created post as JSON response
        return response()->json($post);

    }
}
