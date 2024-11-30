<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthRegController;
use App\Http\Controllers\ChatMessange;
use App\Http\Controllers\ClaimController;
use App\Http\Controllers\DoingNowUserController;
use App\Http\Controllers\EditProfile;
use App\Http\Controllers\LikesController;
use App\Http\Controllers\PusherController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\Testing;

use App\Http\Controllers\testMesseng;
use Illuminate\Http\File;
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

Route::get('/cards', [AuthRegController::class, 'cards']);
// Авторизация/Регистрация
Route::post('/register', [AuthRegController::class, 'register']);
Route::post('/login', [AuthRegController::class, 'login']);
// Профиль пользователя
Route::post('/name', [EditProfile::class, 'name']);
Route::post('/purpose', [EditProfile::class, 'purpose']);
Route::post('/description', [EditProfile::class, 'description']);
Route::post('/about', [EditProfile::class, 'about']);
Route::post('/addEducation', [EditProfile::class, 'addEducation']);
Route::post('/removeEducation', [EditProfile::class, 'removeEducation']);
Route::post('/addInterests', [EditProfile::class, 'addInterests']);
Route::post('/removeInterests', [EditProfile::class, 'removeInterests']);
Route::post('/deleteFoto', [EditProfile::class, 'deleteFoto']);
Route::post('/addFoto', [EditProfile::class, 'addFoto']);
// ПОИСК
Route::get('/usersList', [SearchController::class, 'usersList']);
Route::get('/getOneUser', [SearchController::class, 'getOneUser']);
Route::post('/checkChats', [SearchController::class, 'checkChats']);
// ДЕЙСТВИЯ С КАРТАМИ
Route::post('/likeUser', [DoingNowUserController::class, 'likeUser']);
Route::post('/dislikeUser', [DoingNowUserController::class, 'dislikeUser']);
Route::post('/likeUserPage', [DoingNowUserController::class, 'likeUserPage']);
Route::post('/disLikeUserPage', [DoingNowUserController::class, 'disLikeUserPage']);
// СПИСОК ЛАЙКОВ
Route::get('/userListAll', [LikesController::class, 'userListAll']);
Route::post('/userListLikeMe', [LikesController::class, 'userListLikeMe']);
Route::post('/userListLikeEachOther', [LikesController::class, 'userListLikeEachOther']);
// ДЕЙСТВИЯ АДМИНА
Route::post('/blockUser', [AdminController::class, 'blockUser']);
Route::post('/razBlockUser', [AdminController::class, 'razBlockUser']);
// ЖАЛОБЫ
Route::get('/claimListNew', [ClaimController::class, 'claimListNew']);
Route::get('/claimListCorrecting', [ClaimController::class, 'claimListCorrecting']);
Route::post('/claim', [ClaimController::class, 'postClaim']);
Route::post('/postTime', [ClaimController::class, 'postTime']);
Route::post('/removerClaim', [ClaimController::class, 'removerClaim']);
// ЧАТ
Route::get('/getChats', [ChatMessange::class, 'getChats']);
Route::get('/getMessages', [ChatMessange::class, 'getMessages']);
// МЕССЕНДЖЕРЫ
Route::post('/send-message', [PusherController::class, 'sendMessage']);
Route::get('/get-messages', [PusherController::class, 'getMessage']);
Route::post('/broadcast', [PusherController::class, 'broadcast']);
Route::post('/receive', [PusherController::class, 'receive']);
Route::get('/images/{filename}', function ($filename) {
    $path = storage_path('app/public/usersImgs/' . $filename);
    return response()->file($path);
});
