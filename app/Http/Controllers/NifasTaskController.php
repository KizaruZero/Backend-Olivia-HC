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
use Illuminate\Support\Facades\Validator;




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
        $nifasTaskProgress = NifasTaskProgress::whereIn('nifas_progress_id', $nifasProgress->pluck('id'))->with('nifasTask', 'nifasProgress',)->get();
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

    public function updateProgress(Request $request)
    {
        // Validasi input
        $validator = Validator::make($request->all(), [
            'nifas_progress_id' => 'required|exists:nifas_progress,id',
            'is_completed' => 'required|boolean',
            'completed_at' => 'nullable|date',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            // Cari dan update nifas progress
            $nifasProgress = NifasProgress::findOrFail($request->nifas_progress_id);
            $nifasProgress->is_completed = $request->is_completed;
            
            // Jika completed_at disertakan dalam request, gunakan nilai tersebut
            // Jika tidak dan is_completed=1, set ke waktu sekarang
            if ($request->filled('completed_at')) {
                $nifasProgress->completed_at = $request->completed_at;
            } elseif ($request->is_completed) {
                $nifasProgress->completed_at = Carbon::now();
            } else {
                $nifasProgress->completed_at = null;
            }
            
            $nifasProgress->save();
            
            return response()->json([
                'message' => 'Nifas progress berhasil diperbarui',
                'data' => $nifasProgress
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal memperbarui nifas progress',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function updateBatchTasks(Request $request)
    {

        // Validasi input
        $validator = Validator::make($request->all(), [
            'tasks' => 'required|array',
            'tasks.*.id' => 'required|exists:nifas_progress_tasks,id',
            'tasks.*.is_completed' => 'required|boolean',
            'tasks.*.completed_at' => 'nullable|date',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        DB::beginTransaction();
        
        try {
            foreach ($request->tasks as $taskData) {
                $task = NifasTaskProgress::findOrFail($taskData['id']);
                $task->is_completed = $taskData['is_completed'];
                
                // Handle completed_at field
                if (isset($taskData['completed_at'])) {
                    $task->completed_at = $taskData['completed_at'];
                } elseif ($taskData['is_completed']) {
                    $task->completed_at = Carbon::now();
                } else {
                    $task->completed_at = null;
                }
                
                $task->save();
            }
            
            DB::commit();
            
            return response()->json([
                'message' => 'Tasks berhasil diperbarui'
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            
            return response()->json([
                'message' => 'Gagal memperbarui tasks',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    
}
