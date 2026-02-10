<?php

use App\Http\Controllers\ArticleController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

//Route::get('/', function () {
//    return view('welcome');
//});

Route::get('vite/{any}', function ($any) {
    return app('proxy')->proxy('http://app:3000/' . $any);
})->where('any', '.*');

Route::get('/{any}', function () {
    return view('app');
})->where('any', '.*');
