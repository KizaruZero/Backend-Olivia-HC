<?php

namespace App\Providers;

use App\Models\Nifas;
use App\Models\FaseNifas;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\ServiceProvider;
use App\Models\NifasNotification;

class NifasServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->singleton('nifas.service', function ($app) {
            return new class {
                /**
                 * Membuat data nifas baru
                 */
                public function createNifas($user_id, Carbon $startDate = null)
                {
                    $startDate = $startDate ?? Carbon::now();
                    $endDate = (clone $startDate)->addDays(42); // Masa nifas 42 hari

                    // Non-aktifkan semua nifas sebelumnya untuk user ini
                    Nifas::where('user_id', $user_id)
                        ->update(['is_active' => false]);

                    // Buat record nifas baru
                    return Nifas::create([
                        'user_id' => $user_id,
                        'start_date' => $startDate,
                        'end_date' => $endDate,
                        'is_active' => true,
                    ]);
                }

                /**
                 * Mendapatkan fase nifas saat ini berdasarkan user_id
                 */
                public function getCurrentPhase($user_id)
                {
                    $nifas = Nifas::where('user_id', $user_id)
                        ->where('is_active', true)
                        ->first();

                    if (!$nifas) {
                        return null;
                    }

                    $startDate = Carbon::parse($nifas->start_date);
                    $today = Carbon::today();

                    // Hitung hari ke berapa sejak awal nifas
                    $currentDay = $startDate->diffInDays($today);

                    // Cek fase berdasarkan hari
                    return FaseNifas::getPhaseByDay($currentDay);
                }

                /**
                 * Mendapatkan fase nifas berikutnya
                 */
                public function getNextPhase($user_id)
                {
                    $currentPhase = $this->getCurrentPhase($user_id);

                    if (!$currentPhase) {
                        return null;
                    }

                    return FaseNifas::getNextPhase($currentPhase['phase_name']);
                }

                /**
                 * Menghitung waktu dalam hari menuju fase berikutnya
                 */
                public function getDaysToNextPhase($user_id)
                {
                    $nifas = Nifas::where('user_id', $user_id)
                        ->where('is_active', true)
                        ->first();

                    if (!$nifas) {
                        return null;
                    }

                    $startDate = Carbon::parse($nifas->start_date);
                    $today = Carbon::today();

                    // Hitung hari ke berapa sejak awal nifas
                    $currentDay = $startDate->diffInDays($today);

                    // Cek fase berdasarkan hari
                    $currentPhase = FaseNifas::getPhaseByDay($currentDay);

                    if (!$currentPhase) {
                        return null;
                    }

                    $nextPhase = FaseNifas::getNextPhase($currentPhase['phase_name']);

                    if (!$nextPhase) {
                        return null; // Sudah di fase terakhir
                    }

                    // Hitung selisih hari
                    return $nextPhase['start_day'] - $currentDay;
                }
            };
        });
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}