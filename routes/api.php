<?php

use Illuminate\Http\Request;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\CommentController;
use Illuminate\Support\Facades\Route;



//Route::get('/', [ArticleController::class, 'test']);
Route::get('/articles', [ArticleController::class, 'index']);
Route::get('/articles/{id}', [ArticleController::class, 'show']);
Route::post('/articles', [ArticleController::class, 'store']);
Route::post('/articles/{article}/comments', [CommentController::class, 'store']);

