<?php

namespace App\Http\Controllers;

use App\Models\CreateEducations;
use App\Models\User;
use App\Models\UserImages;
use App\Models\UsersHobbys;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class EditProfile extends Controller
{
    public function name(Request $request)
    {
        $user = User::find($request['idUser']);

        $user->update([
            "name" => $request['userName'],
            "city" => $request['userCity'],
        ]);

        return $user;
    }
    public function purpose(Request $request)
    {
        $user = User::find($request['idUser']);

        $user->update([
            "goal" => $request['userPurpose'],
        ]);
        return $user;
    }
    public function description(Request $request)
    {
        $user = User::find($request['idUser']);

        $user->update([
            "description" => $request['description'],
        ]);
        return $user;
    }
    public function about(Request $request)
    {
        $user = User::find($request['idUser']);

        $user->update([
            "alcohol" => $request['drinksUser'],
            "smoking" => $request['smokingUser'],
            "weight" => $request['rangeBodyUser'],
            "height" => $request['rangeWidthUser'],
            "bodyType" => $request['bodyUser'],
            "financialSituation" => $request['financialSituationUser'],
            "zadiak" => $request['zodiacUser'],
        ]);

        return $user;
    }
    public function addEducation(Request $request)
    {
        $educations = CreateEducations::create([
            "name" => $request['name'],
            "id_user" => $request['idUser'],
        ]);

        $educations = CreateEducations::where('id_user', $request["idUser"])->get();
        return response()->json($educations, 201);
    }
    public function removeEducation(Request $request)
    {
        $educations = CreateEducations::find($request["id"]);
        $educations->delete();

        $educations = CreateEducations::where('id_user', $request["idUser"])->get();
        return response()->json($educations, 201);
    }
    public function addInterests(Request $request)
    {
        $educations = UsersHobbys::create([
            "name" => $request['name'],
            "id_user" => $request['idUser'],
        ]);

        $educations = UsersHobbys::where('id_user', $request["idUser"])->get();
        return response()->json($educations, 201);
    }
    public function removeInterests(Request $request)
    {
        $educations = UsersHobbys::find($request["id"]);
        $educations->delete();

        $educations = UsersHobbys::where('id_user', $request["idUser"])->get();
        return response()->json($educations, 201);
    }
    public function deleteFoto(Request $request)
    {
        // Найти изображение по ID
        $img = UserImages::find($request['id']);

        if ($img) {
            // Удалить файл из папки app/public/usersImgs
            $filePath = 'usersImgs/' . $img->name; // Предполагается, что name содержит имя файла
            if (Storage::disk('public')->exists($filePath)) {
                Storage::disk('public')->delete($filePath);
            }

            // Удалить запись из базы данных
            $img->delete();
        }

        // Получить все оставшиеся изображения пользователя
        $imgs = UserImages::where('id_user', $img['id_user'])->get();

        return $imgs;
    }

    public function addFoto(Request $request)
    {
        // Проверка наличия файла
        if ($request->hasFile('file')) {
            $file = $request->file('file'); // Получаем файл
            $iduser = $request->input('iduser'); // Получаем ID пользователя

            // Генерация уникального имени файла
            $filename = uniqid() . '.' . $file->getClientOriginalExtension();

            // Сохранение файла в папку public/uploads
            $path = $file->storeAs('usersImgs', $filename, 'public');


            $img = UserImages::create([
                "name" => $filename,
                "id_user" => $iduser
            ]);

            $imgs = UserImages::where('id_user', $img['id_user'])->get();

            // Возвращаем успех
            return response()->json($imgs);
        }

        // Если файла нет
        return response()->json(['success' => false, 'message' => 'Файл не найден.']);
    }
}
