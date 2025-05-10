<?php

use App\Http\Controllers\MaternalController;
use App\Http\Controllers\NotesController;
use App\Http\Controllers\FaseNifasController;
use App\Http\Controllers\NifasController;
use App\Http\Controllers\NifasTaskController;
use App\Http\Controllers\NifasTaskProgressController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Kehamilan 
Route::get('/kehamilan/user/{id}', [MaternalController::class, 'getKehamilan'])
    ->name('kehamilan');

// Catatan Harian
Route::get('/daily-notes/dates', [NotesController::class, 'getNoteDates']);
Route::get('/daily-notes', [NotesController::class, 'getDailyNotes']);
Route::post('/daily-notes', [NotesController::class, 'store']);
Route::put('/daily-notes/{id}', [NotesController::class, 'update']);
Route::delete('/daily-notes/{id}', [NotesController::class, 'destroy']);

// Nifas
Route::get('/nifas', [NifasController::class, 'getNifas']);
// Route::middleware('auth:sanctum')->get('/nifas/user', [NifasController::class, 'getNifasByUser']);
Route::get('/nifas-progress', [NifasController::class, 'getNifasProgress']);
Route::get('/nifas-task', [NifasController::class, 'getNifasTask']);
Route::get('/nifas-task-progress', [NifasController::class, 'getNifasTaskProgress']);

// Nifas Task
Route::get('/nifas-task', [NifasTaskController::class, 'getNifasTask']);
Route::get('/nifas-task/{id}', [NifasTaskController::class, 'getNifasTaskById']);
Route::post('/nifas-task', [NifasTaskController::class, 'createNifasTask']);
Route::get('/nifas-task-progress/{nifasId}', [NifasTaskController::class, 'getNifasTaskProgressByNifasId']);
Route::post('/nifasprogress/update', [NifasTaskController::class, 'updateProgress']);
Route::post('/nifastasks/updatebatch', [NifasTaskController::class, 'updateBatchTasks']);


Route::get('/fase-nifas', [FaseNifasController::class, 'getFaseNifas']);

require __DIR__ . '/auth.php';