<?php

namespace App\Http\Controllers;

use App\Models\UserStats;
use Illuminate\Http\Request;

class UserStatsController extends Controller
{
    //
    public function getUserStats()
    {
        $userStats = UserStats::all();
        return response()->json($userStats);
    }

    public function getUserStatsById($id)
    {
        $userStats = UserStats::find($id);
        return response()->json($userStats);
    }

    public function createUserStats(Request $request)
    {
        $userStats = UserStats::create($request->all());
        return response()->json($userStats);
    }
}
