<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function usersList()
    {

        $userList = User::all();
        return response()->json($userList);
    }
}