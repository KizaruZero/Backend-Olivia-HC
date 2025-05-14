<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Nifas;
use App\Models\NifasProgress;
use App\Models\NifasTask;
use App\Models\NifasTaskProgress;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class NifasController extends Controller
{
    //
    public function getNifas()
    {
        $nifas = Nifas::all();
        return response()->json($nifas);
    }

    public function createNifas(Request $request)
    {
        $user = Auth::user();
        $validator = Validator::make($request->all(), [
            'start_date' => 'required|date',
            'end_date' => 'required|date',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        $nifas = Nifas::create([
            'user_id' => $user->id,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
        ]);
        return response()->json($nifas);
    }

    public function updateNifas(Request $request, $id)
    {
        $nifas = Nifas::find($id);
        if (!$nifas) {
            return response()->json(['message' => 'Data nifas tidak ditemukan'], 404);
        }
        
        $nifas->update($request->all());
        
        if ($nifas->save()) {
            return response()->json([
                'message' => 'Data nifas berhasil diubah',
                'id' => $nifas->id,
                'start_date' => $nifas->start_date,
                'end_date' => $nifas->end_date,
                'is_active' => $nifas->is_active
            ], 200);
        } else {
            return response()->json(['message' => 'Data nifas gagal diubah'], 400);
        }
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

    // get fase nifas untuk user
    public function getFaseNifasReminderByUser()
    {
        $user = Auth::user();
        $nifas = Nifas::where('user_id', $user->id)->first();

        if (!$nifas) {
            return response()->json(['message' => 'Data nifas tidak ditemukan'], 404);
        }

        $startDate = new \DateTime($nifas->start_date);
        $today = new \DateTime();
        $interval = $today->diff($startDate);
        $daysPassed = $interval->days;

        $currentPhase = $this->calculateNifasPhase($daysPassed);
        $nextPhase = $currentPhase + 1;
        $nextPhaseDate = $this->getNextPhaseDate($startDate, $nextPhase);

        $reminder = $this->generateReminder($nextPhase, $nextPhaseDate);

        return response()->json([
            'current_phase' => $currentPhase,
            'reminder' => $reminder
        ]);
    }

    private function calculateNifasPhase($daysPassed)
    {
        if ($daysPassed <= 1)
            return 1;
        if ($daysPassed <= 7)
            return 2;
        if ($daysPassed <= 42)
            return 3;
        return 0;
    }

    private function getNextPhaseDate($startDate, $nextPhase)
    {
        $phaseDays = [
            1 => 1,
            2 => 7,
            3 => 42,
        ];

        if ($nextPhase > 3)
            return null;

        $targetDays = $phaseDays[$nextPhase];
        $nextDate = clone $startDate;
        $nextDate->add(new \DateInterval("P{$targetDays}D"));

        return $nextDate;
    }

    private function generateReminder($nextPhase, $nextPhaseDate)
    {
        if (!$nextPhaseDate || $nextPhase > 3) {
            return 0;
        }

        $formattedDate = $nextPhaseDate->format('j F Y');

        return [
            'phase' => $nextPhase,
            'date' => $formattedDate,
            'message' => "Jangan lupa jadwal kunjungan KF {$nextPhase} pada tanggal {$formattedDate}"
        ];
    }





}
