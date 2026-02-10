<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ArticleController extends Controller
{
    public function test()
    {
        return view('about');
    }

    public function index()
    {
        return Article::with('comments')->latest()->get();
    }

    public function show($id)
    {
        return Article::findOrFail($id)->load('comments');
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'content' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $article = Article::create([
            'title' => $request->title,
            'content' => $request->content
        ]);

        return response()->json($article, 201);
    }
}

