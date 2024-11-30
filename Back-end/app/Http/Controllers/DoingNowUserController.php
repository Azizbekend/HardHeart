<?php

namespace App\Http\Controllers;

use App\Models\Chats;
use App\Models\HistoryLikes;
use App\Models\Likes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DoingNowUserController extends Controller
{
    public function likeUser(Request $request)
    {
        $likes = Likes::create([
            "id_user_whom" => $request['id_user_whom'],
            "whom_like" => $request['whom_like'],
            "id_user_who" => $request['id_user_who'],
            "who_like" => $request['who_like'],
        ]);

        $history = HistoryLikes::create([
            "clickUser" => $request["id_user_whom"],
            "recomUser" => $request["id_user_who"],
        ]);
    }
    public function dislikeUser(Request $request)
    {
        $history = HistoryLikes::create([
            "clickUser" => $request["id_user_whom"],
            "recomUser" => $request["id_user_who"],
        ]);
    }
    public function likeUserPage(Request $request)
    {
        $likes = Likes::where("id_user_whom", $request['id_user_whom'])->where("id_user_who", $request['id_user_who'])->get();
        $likes[0]->update([
            "who_like" => 1,
        ]);

        $chat = Chats::create([
            "id_user_1" => $request['id_user_who'],
            "id_user_2" => $request['id_user_whom'],
        ]);

        return $likes;
    }
    public function disLikeUserPage(Request $request)
    {
        $likes = Likes::where("id_user_whom", $request['id_user_whom'])->where("id_user_who", $request['id_user_who'])->get();
        $likes[0]->update([
            "who_like" => 2,
        ]);
    }
}
