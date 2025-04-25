<?php

use App\Http\Controllers\MaternalController;
use App\Http\Controllers\NotesController;
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

?>