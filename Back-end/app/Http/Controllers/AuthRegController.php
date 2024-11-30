<?php

namespace App\Http\Controllers;

use App\Models\CreateEducations;
use App\Models\User;
use App\Models\UserImages;
use App\Models\UsersHobbys;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthRegController extends Controller
{
    // Метод регистрации
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:20',
            'age' => 'required|date',
            'email' => 'required|string|email|max:100|unique:users',
            'gender' => 'required|string',
            'password' => 'required|string|min:6|max:20',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'age' => $request->age,
            'gender' => $request->gender,
            'role' => "user",
            'date_creat' => $request->age,
        ]);

        $user['educations'] = [];
        $user['imgs'] = [];
        $user['interests'] = [];

        $token = $user->createToken('authToken')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
        ], 201);
    }


    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (!Auth::attempt($credentials)) {
            return response()->json(['message' => 'Неверный логин или пароль'], 401);
        }

        $user = Auth::user();

        $user['educations'] = CreateEducations::where('id_user', $user["id"])->get();
        $user['imgs'] = UserImages::where('id_user', $user["id"])->get();
        $user['interests'] = UsersHobbys::where('id_user', $user["id"])->get();


        return $user;
    }

    public function cards(Request $request)
    {

        $cards = [
            "id" => 0,
            "adress" => "string",
            "companyName" => "string",
            "latitude" => 0,
            "longitude" => 0,
            "dailyLimit" => 0,
            "isArchived" => true,
            "name" => "string",
            "firstName" => "string",
            "lastName" => "string",
            "patronymic" => "string",
            "post" => "string",
            "phone" => "string",
            "email" => "string",
            "municipalities" => [
                "id" => 0,
                "name" => "string"
            ]
        ];
        return response()->json($cards);
    }
}
