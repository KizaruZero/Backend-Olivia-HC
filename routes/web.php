<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\NifasController;
use App\Http\Controllers\NifasTaskController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserControllerAuth;
use App\Http\Controllers\ImunisasiController;

Route::get('/', function () {
    return Inertia::render('HomeView', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

Route::get('/dashboard', function () {
    return Inertia::render('UserDashboardView');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/imunisasi', function () {
    return Inertia::render('ImunisasiDashboardView');
})->middleware(['auth', 'verified'])->name('imunisasi');

Route::middleware('auth')->group(function () {
    Route::get('/profile-page', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile-page', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile-page', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Route::get('/maternal', function () {
    return Inertia::render('MaternalDashboard');
})->name('maternal');

Route::get('/user-dashboard', function () {
    return Inertia::render('UserDashboardView');
})->name('user-dashboard');

Route::get('/api/nifas/user', [NifasController::class, 'getNifasByUser']);
Route::post('/api/nifas/user', [NifasController::class, 'createNifas']);
Route::post('/api/nifas/user/{id}', [NifasController::class, 'updateNifas']);
Route::get('/api/nifasprogress/user', [NifasTaskController::class, 'getCompletedNifasProgressByUser']);

Route::get('/api/nifastask/user', [NifasTaskController::class, 'getNifasTaskProgressByUser']);
Route::get('/api/nifastask/percentage', [NifasTaskController::class, 'getAllFaseNifasWithPercentage']);
Route::get('/api/nifas/reminder', [NifasController::class, 'getFaseNifasReminderByUser']);

Route::get('profile', function () {
    return Inertia::render('Profile/ProfilePage');
})->name('profile');


Route::get('/api/user/current', [UserController::class, 'getCurrentUser']);
Route::post('/api/user/current', [UserController::class, 'updateUser']);
Route::post('/api/user/update-profile-picture', [UserController::class, 'updateProfilePicture']);

// imunisasi
Route::get('/api/imunisasi/user', [ImunisasiController::class, 'getImunisasi']);
Route::get('/api/faseimunisasi/user', [ImunisasiController::class, 'getFaseImunisasi']);
Route::put('/api/faseimunisasi/user/{id}', [ImunisasiController::class, 'updateFaseImunisasi']);

require __DIR__ . '/auth.php';
