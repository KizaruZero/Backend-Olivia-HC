<?php

namespace App\Http\Controllers;

use App\Models\NifasTask;
use App\Models\NifasTaskProgress;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Nifas;
use App\Models\FaseNifas;
use Carbon\Carbon;
use App\Models\NifasProgress;
use Illuminate\Support\Facades\DB;

class NifasTaskController extends Controller
{
    public function getNifasTask()
    {
        $nifasTask = NifasTask::all();
        return response()->json($nifasTask);
    }

    public function getNifasTaskById($id)
    {
        $nifasTask = NifasTask::find($id);
        return response()->json($nifasTask);
    }

    public function createNifasTask(Request $request)
    {
        $nifasTask = NifasTask::create($request->all());
        return response()->json($nifasTask);
    }

    public function getNifasTaskProgressByNifasId($nifasId)
    {
        $nifasTaskProgress = NifasTaskProgress::where('nifasProgress.nifas_id', $nifasId)->get();
        return response()->json($nifasTaskProgress);
    }

    public function getNifasTaskProgressByUser()
    {
        $user = Auth::user();

        // Get active nifas record for this user
        $nifas = Nifas::where('user_id', $user->id)
            ->where('is_active', true)
            ->first();

        if (!$nifas) {
            return response()->json([
                'message' => 'No active Nifas record found'
            ], 404);
        }

        //setiap nifasProgress yang memiliki nifas_id yang sama dengan nifas->id, maka ambil nifasTaskProgress yang memiliki nifasProgress->id yang sama dengan nifasTaskProgress->nifasProgress_id
        $nifasProgress = NifasProgress::where('nifas_id', $nifas->id)->get();
        $nifasTaskProgress = NifasTaskProgress::whereIn('nifas_progress_id', $nifasProgress->pluck('id'))->with('nifasTask', 'nifasProgress', 'nifasProgress.nifas.user', 'nifasTask.faseNifas')->get();
        return response()->json($nifasTaskProgress);
    }

    public function getPercentageCompletedTaskByFaseNifasId($faseNifasId)
    {
        $user = Auth::user();

        $nifas = Nifas::where('user_id', $user->id)
            ->where('is_active', true)
            ->first();

        if (!$nifas) {
            return response()->json([
                'message' => 'No active Nifas record found'
            ], 404);
        }

        $nifasProgress = NifasProgress::where('nifas_id', $nifas->id)->get();
        $nifasTasks = NifasTask::where('fase_nifas_id', $faseNifasId)->get();

        if ($nifasTasks->isEmpty()) {
            return response()->json([
                'message' => 'No tasks found for this fase nifas',
                'percentage' => 0
            ]);
        }

        $nifasTaskProgress = NifasTaskProgress::whereIn('nifas_progress_id', $nifasProgress->pluck('id'))
            ->whereIn('nifas_task_id', $nifasTasks->pluck('id'))
            ->get();

        if ($nifasTaskProgress->isEmpty()) {
            return response()->json([
                'message' => 'No task progress found for this fase nifas',
                'percentage' => 0
            ]);
        }

        $faseNifas = FaseNifas::all();

        // Count completed tasks
        $totalTasks = $nifasTaskProgress->count();
        $completedTasks = $nifasTaskProgress->where('is_completed', 1)->count();

        // Calculate percentage
        $percentage = $totalTasks > 0 ? ($completedTasks / $totalTasks) * 100 : 0;

        return response()->json([
            'fase_nifas_id' => $faseNifasId,
            'total_tasks' => $totalTasks,
            'completed_tasks' => $completedTasks,
            'percentage' => round($percentage, 2)
        ]);
    }

    public function getAllFaseNifasWithPercentage()
    {
        $user = Auth::user();

        // Get active nifas record for this user
        $nifas = Nifas::where('user_id', $user->id)
            ->where('is_active', true)
            ->first();

        if (!$nifas) {
            return response()->json([
                'message' => 'No active Nifas record found'
            ], 404);
        }

        // Get all nifas progress related to this nifas record
        $nifasProgress = NifasProgress::where('nifas_id', $nifas->id)->get();

        // Get all fase nifas
        $allFaseNifas = FaseNifas::all();

        $result = [];

        // Calculate progress for each fase nifas
        foreach ($allFaseNifas as $faseNifas) {
            // Get tasks for this fase
            $nifasTasks = NifasTask::where('fase_nifas_id', $faseNifas->id)->get();

            // Default values
            $totalTasks = 0;
            $completedTasks = 0;
            $percentage = 0;

            if (!$nifasTasks->isEmpty()) {
                // Get task progress for this fase
                $nifasTaskProgress = NifasTaskProgress::whereIn('nifas_progress_id', $nifasProgress->pluck('id'))
                    ->whereIn('nifas_task_id', $nifasTasks->pluck('id'))
                    ->get();

                if (!$nifasTaskProgress->isEmpty()) {
                    $totalTasks = $nifasTaskProgress->count();
                    $completedTasks = $nifasTaskProgress->where('is_completed', 1)->count();
                    $percentage = $totalTasks > 0 ? ($completedTasks / $totalTasks) * 100 : 0;
                }
            }

            // Add to result array with only the needed fields for frontend
            $result[] = [
                'id' => $faseNifas->id,
                'name' => $faseNifas->name,
                'description' => $faseNifas->description,
                'progress' => round($percentage, 2)
            ];
        }

        return response()->json($result);
    }
}
