<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CommentController extends Controller
{
    public function store(Request $request, $articleId)
    {
        $validator = Validator::make($request->all(), [
            'author_name' => 'required|string|max:255',
            'content' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $comment = Comment::create([
            'article_id' => $articleId,
            'author_name' => $request->author_name,
            'content' => $request->content
        ]);

        return response()->json($comment, 201);
    }
}

