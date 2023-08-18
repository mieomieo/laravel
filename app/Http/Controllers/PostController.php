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
        // // $post = Post::create($input);

        $post = Post::create([
            'title' => '',
            'content' => '',
            'date' => $input['date'],
            'offsetY' => $input['offsetY']
        ]);

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

        $validatedData = $request->validate([
        'editedTitle' => 'required|string|max:255',
        'editedContent' => 'required|string',
        'editedDate' => 'numeric',
        // 'editedOffsetY'=>'numeric'
        // Các trường dữ liệu khác cần được xác thực nếu có
    ]);
    // 'editedOffsetY' => 'numeric',

        try {
            // Các dòng gán dữ liệu và lưu dữ liệu
            $item->title = $validatedData['editedTitle'];
            $item->content = $validatedData['editedContent'];
            $item->date = $validatedData['editedDate'];
            // $item->offsetY = $validatedData['editedOffsetY'];
            // dd($item);
            $item->save();
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);


        }
        // $item->content = $validatedData['editedContent'];
        // // $item->date = $validatedData['editedDate'];
        // // $item->offsetY = $validatedData['editedOffsetY'];
        // $item->save();

        return response()->json($item);
    }
}
