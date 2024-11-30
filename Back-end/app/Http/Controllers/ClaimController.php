<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Claim;
use App\Models\User;
use Carbon\Carbon;

class ClaimController extends Controller
{
    public function postClaim(Request $request)
    {
        $claim = Claim::create([
            "whom" => $request["whom"],
            "who" => $request["who"],
            "discription" => $request["discription"],
            "timer" => null
        ]);
    }
    public function claimListNew()
    {
        $claims = Claim::where("timer", null)->get();
        $claimList = [];

        for ($i = 0; $i < count($claims); $i++) {
            $claimList[$i]['id'] = $claims[$i]['id'];
            $claimList[$i]['whomInfo'] = User::where("id", $claims[$i]['whom'])->get()[0];
            $claimList[$i]['whoInfo'] = User::where("id", $claims[$i]['who'])->get()[0];
            $claimList[$i]['discription'] = $claims[$i]['discription'];
        }

        return $claimList;
    }
    public function claimListCorrecting()
    {
        $claims = Claim::whereNot("timer", null)->get();

        $claimList = [];

        for ($i = 0; $i < count($claims); $i++) {
            $claimList[$i]['id'] = $claims[$i]['id'];
            $claimList[$i]['whoInfo'] = User::where("id", $claims[$i]['who'])->get()[0];
            $claimList[$i]['discription'] = $claims[$i]['discription'];
            $claimList[$i]['timer'] = $claims[$i]['timer'];
        }

        return $claimList;
    }
    public function postTime(Request $request)
    {
        $inputTime = $request['timer'];
        $formattedTime = Carbon::parse($inputTime)->format('Y-m-d H:i:s');

        $complaint = Claim::where('id', $request['id'])->first();
        $complaint->update(["timer" => $formattedTime]);
        return $complaint;
    }
    public function removerClaim(Request $request)
    {
        $complaint = Claim::find($request["id"]);
        $complaint->delete();


        $claims = [];

        if ($request['type'] == "claimListNew") {
            $claims = Claim::where("timer", null)->get();
        }
        if ($request['type'] == "claimListCorrecting") {
            $claims = Claim::whereNot("timer", null)->get();
        }
        $claimList = [];

        for ($i = 0; $i < count($claims); $i++) {
            $claimList[$i]['id'] = $claims[$i]['id'];
            $claimList[$i]['whomInfo'] = User::where("id", $claims[$i]['whom'])->get()[0];
            $claimList[$i]['whoInfo'] = User::where("id", $claims[$i]['who'])->get()[0];
            $claimList[$i]['discription'] = $claims[$i]['discription'];
        }

        return $claimList;
    }
}
