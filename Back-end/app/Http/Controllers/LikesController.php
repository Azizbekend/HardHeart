<?php

namespace App\Http\Controllers;

use App\Models\CreateEducations;
use App\Models\Likes;
use App\Models\User;
use App\Models\UserImages;
use App\Models\UsersHobbys;
use Illuminate\Http\Request;

class LikesController extends Controller
{
    public function userListAll(Request $request)
    {
        $idList = User::where("role", "user")->orWhere("role", "block")->get();
        for ($i = 0; $i < count($idList); $i++) {
            $imgs = UserImages::where("id_user", $idList[$i]["id"])->get();
            if (count($imgs) > 0) {
                $idList[$i]['img'] = $imgs[0]['name'];
            }
        }
        return response()->json($idList);
    }

    public function userListLikeMe(Request $request)
    {
        $idList = Likes::where("id_user_who", $request["idUser"])->where("who_like", 0)->where("whom_like", 1)->get();
        $userList = [];

        for ($i = 0; $i < count($idList); $i++) {
            $userList[$i] = User::where("id", $idList[$i]["id_user_whom"])->get();
            $userList[$i]  = $userList[$i][0];
            $userList[$i]['img'] = UserImages::where("id_user", $userList[$i]["id"])->get()[0]['name'];
        }
        return response()->json($userList);
    }

    public function userListLikeEachOther(Request $request)
    {
        $idList = Likes::where("id_user_who", $request["idUser"])->where("who_like", 1)->where("whom_like", 1)->get();
        $userList = [];

        for ($i = 0; $i < count($idList); $i++) {
            $userList[$i] = User::where("id", $idList[$i]["id_user_whom"])->get();
            $userList[$i]  = $userList[$i][0];
            $userList[$i]['img'] = UserImages::where("id_user", $userList[$i]["id"])->get()[0]['name'];
        }

        return response()->json($userList);
    }
}
