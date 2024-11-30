<?php

namespace App\Http\Controllers;

use App\Models\Chats;
use App\Models\CreateEducations;
use App\Models\Messages;
use App\Models\User;
use App\Models\UserImages;
use App\Models\UsersHobbys;
use Illuminate\Http\Request;

class ChatMessange extends Controller
{
    public function getChats(Request $request)
    {
        $chatList = Chats::where("id_user_1", $request["idUser"])->orWhere("id_user_2", $request["idUser"])->get();
        $chats = [];
        for ($i = 0; $i < count($chatList); $i++) {

            $friend = $chatList[$i]["id_user_2"] ==  $request["idUser"] ? "id_user_1" : "id_user_2";

            $chats[$i]['idChat'] =  $chatList[$i]["id"];
            $chats[$i]['userInfo'] =  [
                "idUserFriend" => $chatList[$i][$friend],
                "name" => User::where("id", $chatList[$i][$friend])->pluck('name')[0],
                "img" => UserImages::where("id_user", $chatList[$i][$friend])->get()[0]['name'],
            ];
            $chats[$i]['firstMess'] = Messages::where("id_chat", $chatList[$i]['id'])->latest()->first()->message ?? null;
        }
        return $chats;
    }
    public function getMessages(Request $request)
    {
        $messageList = Messages::where("id_chat", $request["idChat"])->get();

        $friend = User::where("id", $request['idUserFriends'])->get();
        $friend[0]['educations'] = CreateEducations::where("id_user", $request['idUserFriends'])->get();
        $friend[0]['interests'] = UsersHobbys::where("id_user", $request['idUserFriends'])->get();
        $friend[0]['img'] = UserImages::where("id_user", $request['idUserFriends'])->get()[0]['name'];
        // return [$friend];
        return ["messageList" => $messageList, "friend" => $friend[0]];
    }
}
