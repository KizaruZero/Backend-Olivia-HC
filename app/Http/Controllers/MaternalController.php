<?php

namespace App\Http\Controllers;

use App\Models\Kehamilan;
use Illuminate\Http\Request;
use App\Models\User;

class MaternalController extends Controller
{
    // ambil data kehamilan
    public function getKehamilan($UserId)
    {
        $kehamilan = Kehamilan::where('user_id', $UserId)->with('user')->latest()->first();
        return response()->json([
            'kehamilan' => $kehamilan,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'last_periode_date' => 'required|date',
            'estimated_due_date' => 'required|date',
            'is_active' => 'required|boolean',
            'status' => 'required|string|in:hamil,melahirkan,keguguran,nifas,selesai',
            'delivered_date' => 'nullable|date',
            'miscarriage_week' => 'nullable|integer',
            'is_nifas_complete' => 'nullable|boolean',
            'notes' => 'nullable|string',
        ]);

        $user = User::find($request->user_id);
        if (!$user) {
            return response()->json([
                'message' => 'User not found',
            ], 404);
        }

        $user->kehamilan()->createMany($request->kehamilan);

        return response()->json([
            'message' => 'Kehamilan created successfully',
        ]);
    }


}


