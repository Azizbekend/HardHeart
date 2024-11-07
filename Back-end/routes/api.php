<?php

use App\Http\Controllers\AuthRegController;
use App\Http\Controllers\EditProfile;
use App\Http\Controllers\PusherController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\Testing;

use App\Http\Controllers\testMesseng;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//* Авторизация/Регистрация
Route::post('/register', [AuthRegController::class, 'register']);
Route::post('/login', [AuthRegController::class, 'login']);

//* Профиль пользователя
Route::post('/name', [EditProfile::class, 'name']);
Route::post('/purpose', [EditProfile::class, 'purpose']);
Route::post('/description', [EditProfile::class, 'description']);
Route::post('/about', [EditProfile::class, 'about']);
Route::post('/addEducation', [EditProfile::class, 'addEducation']);
Route::post('/removeEducation', [EditProfile::class, 'removeEducation']);
Route::post('/addInterests', [EditProfile::class, 'addInterests']);
Route::post('/removeInterests', [EditProfile::class, 'removeInterests']);
Route::get('/getImgs', [EditProfile::class, 'getImgs']);


// ПОИСК
Route::get('/usersList', [SearchController::class, 'usersList']);


// ЧАТ
Route::post('/send-message', [PusherController::class, 'sendMessage']);
Route::get('/get-messages', [PusherController::class, 'getMessage']);

Route::post('/broadcast', [PusherController::class, 'broadcast']);
Route::post('/receive', [PusherController::class, 'receive']);


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
