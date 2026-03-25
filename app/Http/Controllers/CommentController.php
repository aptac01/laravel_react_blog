<?php

namespace App\Http\Controllers;

use App\Events\CommentDeletedEvent;
use App\Events\NewCommentEvent;
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

//        задержка 0.1 секунды
        broadcast((new NewCommentEvent($comment, $articleId))->delay(now()->addMilliseconds(100)));

        return response()->json($comment, 201);
    }

    public function delete(Request $request, $articleId, $commentId)
    {
        try {
            Comment::where('id', $commentId)
                ->where('article_id', $articleId)
                ->delete();
        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json(['success' => false, 'message' => 'Ошибка базы данных, ' . $e], 403);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Внутренняя ошибка, ' . $e], 403);
        }

//        задержка 0.1 секунды
        broadcast((new CommentDeletedEvent((int)$articleId, (int)$commentId))->delay(now()->addMilliseconds(100)));

        return response()->json([
            'deleted' => true,
        ], 201);
    }
}

