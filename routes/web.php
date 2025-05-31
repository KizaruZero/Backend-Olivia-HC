<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\NifasController;
use App\Http\Controllers\NifasTaskController;
Route::get('/', function () {
    return Inertia::render('HomeView', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Route::get('/maternal', function () {
    return Inertia::render('MaternalDashboard');
})->name('maternal');

Route::get('/user-dashboard', function () {
    return Inertia::render('UserDashboardView');
})->name('user-dashboard');

Route::get('/api/nifas/user', [NifasController::class, 'getNifasByUser']);

Route::get('/api/nifastask/user', [NifasTaskController::class, 'getNifasTaskProgressByUser']);
Route::get('/api/nifastask/percentage', [NifasTaskController::class, 'getAllFaseNifasWithPercentage']);
Route::get('/api/nifas/reminder', [NifasController::class, 'getFaseNifasReminderByUser']);

require __DIR__ . '/auth.php';
