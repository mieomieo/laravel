<?php

namespace App\Http\Controllers;
use App\Models\Post;
use Illuminate\Http\Request;

class POSTController extends Controller
{
    public function create(Request $request) {


       Post->save();
    }
}
