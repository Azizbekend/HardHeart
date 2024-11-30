<?php

namespace App\Http\Controllers;

use App\Models\Chats;
use App\Models\CreateEducations;
use App\Models\User;
use App\Models\UserImages;
use App\Models\UsersHobbys;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SearchController extends Controller
{
    public function usersList(Request $request)
    {
        $currentUserId = $request['id']; // ID текущего пользователя
        $currentUserBirthDate = $request['birth_date']; // Дата рождения текущего пользователя
        $gender = '';

        if ($request['gender'] === "man") {
            $gender = "woman";
        } else {
            $gender = "man";
        }
        // Получаем пользователей с фильтрацией по возрасту и исключенными просмотренными
        $recommendedUsers = DB::table('users as u')
            ->where('u.id', '!=', $currentUserId)
            ->where('u.role', '!=', "admin")
            ->where('u.gender', $gender)
            ->whereBetween(
                DB::raw("TIMESTAMPDIFF(YEAR, u.age, CURDATE())"), // Вычисляем возраст пользователя
                [
                    DB::raw("TIMESTAMPDIFF(YEAR, '$currentUserBirthDate', CURDATE()) - 8"),
                    DB::raw("TIMESTAMPDIFF(YEAR, '$currentUserBirthDate', CURDATE()) + 8")
                ]
            )
            ->whereNotIn('u.id', function ($query) use ($currentUserId) {
                $query->select('recomUser')
                    ->from('history_likes')
                    ->where('clickUser', $currentUserId);
            })
            ->get()
            ->map(function ($user) {
                // Добавляем связанные данные для образования и интересов
                $user->educations = CreateEducations::where("id_user", $user->id)->get();
                $user->interests = UsersHobbys::where("id_user", $user->id)->get();
                $user->imgs = UserImages::where("id_user", $user->id)->get();
                return $user;
            });

        return response()->json($recommendedUsers);
    }


    public function getOneUser(Request $request)
    {
        $idList = User::where("id", $request['id'])->get()
            ->map(function ($user) {
                // Добавляем связанные данные для образования и интересов
                $user->educations = CreateEducations::where("id_user", $user->id)->get();
                $user->interests = UsersHobbys::where("id_user", $user->id)->get();
                $user->imgs = UserImages::where("id_user", $user->id)->get();
                return $user;
            })[0];
        return response()->json($idList);
    }

    public function checkChats(Request $request)
    {
        $chat = Chats::where("id_user_1", $request['idAdmin'])->where("id_user_2", $request['idUser'])->first();;
        $result = [];

        if (empty($chat)) {
            $chat = Chats::create([
                "id_user_1" => $request['idAdmin'],
                "id_user_2" => $request['idUser']
            ]);
            $result = $chat['id'];
        } else {
            $result = $chat['id'];
        }

        return response()->json($result);
    }
}
