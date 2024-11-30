<?php

namespace App\Http\Controllers;

use App\Models\ComplaintCorrecting;
use App\Models\Likes;
use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function blockUser(Request $request)
    {
        $user = User::where("id", $request['idUser'])->get();
        $user[0]->update(["role" => "block"]);
    }
    public function razBlockUser(Request $request)
    {
        $user = User::where("id", $request['idUser'])->get();
        $user[0]->update(["role" => "user"]);
    }
}
