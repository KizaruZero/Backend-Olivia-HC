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
        if ($daysPassed <= 10)
            return 1;
        if ($daysPassed <= 20)
            return 2;
        if ($daysPassed <= 30)
            return 3;
        if ($daysPassed <= 42)
            return 4;
        return 0;
    }

    private function getNextPhaseDate($startDate, $nextPhase)
    {
        $phaseDays = [
            1 => 10,
            2 => 20,
            3 => 30,
            4 => 42
        ];

        if ($nextPhase > 4)
            return null;

        $targetDays = $phaseDays[$nextPhase];
        $nextDate = clone $startDate;
        $nextDate->add(new \DateInterval("P{$targetDays}D"));

        return $nextDate;
    }

    private function generateReminder($nextPhase, $nextPhaseDate)
    {
        if (!$nextPhaseDate || $nextPhase > 4) {
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
