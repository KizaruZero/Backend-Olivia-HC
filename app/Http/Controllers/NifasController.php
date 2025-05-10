<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Nifas;
use App\Models\NifasProgress;
use App\Models\NifasTask;
use App\Models\NifasTaskProgress;
use Illuminate\Support\Facades\Auth;
class NifasController extends Controller
{
    //
    public function getNifas()
    {
        $nifas = Nifas::all();
        return response()->json($nifas);
    }

    public function getNifasByUser()
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $nifas = Nifas::where('user_id', $user->id)->get();
        return response()->json($nifas);
    }





}
