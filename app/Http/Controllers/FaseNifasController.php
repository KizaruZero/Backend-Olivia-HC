<?php

namespace App\Http\Controllers;

use App\Models\FaseNifas;
use Illuminate\Http\Request;

class FaseNifasController extends Controller
{
    //
    public function getFaseNifas()
    {
        $faseNifas = FaseNifas::all();
        return response()->json($faseNifas);
    }
}
