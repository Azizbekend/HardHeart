<?php

namespace App\Http\Controllers;

use App\Models\CreateEducations;
use App\Models\User;
use App\Models\UserImages;
use App\Models\UsersHobbys;
use Illuminate\Http\Request;

class EditProfile extends Controller
{
    public function name(Request $request)
    {
        $user = User::find($request['idUser']);

        $user->update([
            "name"=>$request['userName'],
            "city"=>$request['userCity'],
        ]);

        return $user;
    }
    public function purpose(Request $request)
    {
        $user = User::find($request['idUser']);

        $user->update([
            "goal"=>$request['userPurpose'],
        ]);
        return $user;
    }
    public function description(Request $request)
    {
        $user = User::find($request['idUser']);

        $user->update([
            "description"=>$request['description'],
        ]);
        return $user;
    }
    public function about(Request $request)
    {
        $user = User::find($request['idUser']);

        $user->update([
            "alcohol"=>$request['drinksUser'],
            "smoking"=>$request['smokingUser'],
            "height"=>$request['rangeBodyUser'],
            "weight"=>$request['rangeWidthUser'],
            "bodyType"=>$request['bodyUser'],
            "financialSituation"=>$request['financialSituationUser'],
            "zadiak"=>$request['zodiacUser'],
        ]);

        return $user;
    }
    public function addEducation(Request $request)
    {
        $educations = CreateEducations::create([
            "name"=>$request['name'],
            "id_user"=>$request['idUser'],
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
            "name"=>$request['name'],
            "id_user"=>$request['idUser'],
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

    public function getImgs(Request $request)
    {
        $imgs = UserImages::where('id_user', $request["idUser"])->get();

        return $imgs;
    }
}
