<?php

namespace App\Console\Commands;

use App\Models\Nifas;
use App\Models\FaseNifas;
use App\Models\NifasNotification;
use App\Notifications\NifasPhaseReminder;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Notification;
use Symfony\Component\Console\Command\Command as SymfonyCommand;

class SendNifasReminders extends Command
{
    protected $signature = 'nifas:send-reminders';
    protected $description = 'Mengirim pengingat untuk tahapan nifas';

    public function handle()
    {
        file_put_contents(storage_path('logs/nifas-debug.log'), date('Y-m-d H:i:s') . " - Starting command\n", FILE_APPEND);

        Log::info('=== Memulai proses pengiriman notifikasi nifas ===');
        $this->info('Memulai proses pengiriman notifikasi nifas...');

        try {
            file_put_contents(storage_path('logs/nifas-debug.log'), date('Y-m-d H:i:s') . " - Checking environment\n", FILE_APPEND);

            // Debug: Log environment
            Log::info('Environment: ' . app()->environment());
            Log::info('Mail Driver: ' . config('mail.default'));
            $this->info('Environment: ' . app()->environment());
            $this->info('Mail Driver: ' . config('mail.default'));

            file_put_contents(storage_path('logs/nifas-debug.log'), date('Y-m-d H:i:s') . " - Querying active nifas\n", FILE_APPEND);

            // Ambil semua data nifas yang aktif
            $activeNifas = Nifas::where('is_active', true)
                ->where('start_date', '<=', now())
                ->where('end_date', '>=', now())
                ->get();

            file_put_contents(storage_path('logs/nifas-debug.log'), date('Y-m-d H:i:s') . " - Found {$activeNifas->count()} active nifas\n", FILE_APPEND);

            $this->info("Ditemukan {$activeNifas->count()} data nifas aktif");

            if ($activeNifas->isEmpty()) {
                $this->warn('Tidak ada data nifas aktif yang ditemukan');
                return SymfonyCommand::SUCCESS;
            }

            foreach ($activeNifas as $nifas) {
                $this->processNifasNotification($nifas);
            }

            $this->info('Proses pengiriman notifikasi selesai');

            return SymfonyCommand::SUCCESS;
        } catch (\Exception $e) {
            $this->error("Error saat mengirim notifikasi: " . $e->getMessage());
            $this->error("Stack trace: " . $e->getTraceAsString());
            return SymfonyCommand::FAILURE;
        }
    }

    private function processNifasNotification($nifas)
    {
        try {
            $startDate = Carbon::parse($nifas->start_date);
            $today = Carbon::today();

            // Hitung hari ke berapa sejak awal nifas
            $currentDay = $startDate->diffInDays($today);
            Log::info("Memproses nifas", [
                'nifas_id' => $nifas->id,
                'user_id' => $nifas->user_id,
                'current_day' => $currentDay,
                'start_date' => $startDate->toDateString(),
                'today' => $today->toDateString()
            ]);

            // Cek fase berdasarkan hari
            $currentPhase = FaseNifas::getPhaseByDay($currentDay);
            Log::info("Fase yang ditemukan", [
                'phase' => $currentPhase,
                'current_day' => $currentDay
            ]);

            if (!$currentPhase) {
                Log::warning("Tidak ditemukan fase untuk hari ke-{$currentDay}");
                return;
            }

            // Jika hari ini adalah hari pertama fase baru, kirim notifikasi
            if ($currentDay === $currentPhase['start_day']) {
                Log::info("Hari ini adalah hari pertama fase baru", [
                    'phase' => $currentPhase['phase_name'],
                    'day' => $currentDay,
                    'start_day' => $currentPhase['start_day']
                ]);
                $this->sendPhaseReminder($nifas, $currentPhase);
            } else {
                Log::info("Hari ini bukan hari pertama fase", [
                    'current_day' => $currentDay,
                    'phase_start_day' => $currentPhase['start_day']
                ]);
            }

            // Tambahan: Jika akan memasuki fase baru besok, kirim notifikasi preemptive
            $nextDay = $currentDay + 1;
            $nextPhase = FaseNifas::getPhaseByDay($nextDay);

            if ($nextPhase && $nextPhase['phase_name'] !== $currentPhase['phase_name']) {
                Log::info("Akan memasuki fase baru besok", [
                    'current_phase' => $currentPhase['phase_name'],
                    'next_phase' => $nextPhase['phase_name'],
                    'current_day' => $currentDay,
                    'next_day' => $nextDay
                ]);
                $this->sendPreemptiveReminder($nifas, $nextPhase);
            }
        } catch (\Exception $e) {
            Log::error("Error dalam processNifasNotification", [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
        }
    }

    private function sendPhaseReminder($nifas, $phase)
    {
        try {
            Log::info("Memulai pengiriman notifikasi fase", [
                'nifas_id' => $nifas->id,
                'phase' => $phase['phase_name']
            ]);

            // Cek apakah notifikasi untuk fase ini sudah pernah dikirim
            $notificationExists = NifasNotification::where('nifas_id', $nifas->id)
                ->where('phase_name', $phase['phase_name'])
                ->exists();

            if ($notificationExists) {
                Log::info("Notifikasi untuk fase ini sudah pernah dikirim", [
                    'nifas_id' => $nifas->id,
                    'phase' => $phase['phase_name']
                ]);
                return;
            }

            // Debug: Log user information
            $user = $nifas->user;
            if (!$user) {
                Log::error("User tidak ditemukan untuk nifas", ['nifas_id' => $nifas->id]);
                return;
            }

            Log::info("Mencoba mengirim notifikasi ke user", [
                'user_id' => $user->id,
                'email' => $user->email,
                'phase' => $phase['phase_name']
            ]);

            // Kirim notifikasi
            try {
                $user->notify(new NifasPhaseReminder($nifas, $phase['phase_name'], $phase['description']));
                Log::info("Notifikasi berhasil dikirim ke user");
            } catch (\Exception $e) {
                Log::error("Gagal mengirim notifikasi", [
                    'error' => $e->getMessage(),
                    'user_id' => $user->id,
                    'email' => $user->email
                ]);
                throw $e;
            }

            // Simpan record notifikasi
            try {
                $notification = NifasNotification::create([
                    'nifas_id' => $nifas->id,
                    'user_id' => $user->id,
                    'phase_name' => $phase['phase_name'],
                    'sent_at' => now(),
                ]);
                Log::info("Notifikasi berhasil disimpan ke database", [
                    'notification_id' => $notification->id
                ]);
            } catch (\Exception $e) {
                Log::error("Gagal menyimpan notifikasi ke database", [
                    'error' => $e->getMessage(),
                    'nifas_id' => $nifas->id,
                    'user_id' => $user->id
                ]);
                throw $e;
            }

        } catch (\Exception $e) {
            Log::error("Error saat mengirim notifikasi", [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            throw $e;
        }
    }

    private function sendPreemptiveReminder($nifas, $nextPhase)
    {
        try {
            Log::info("Memulai pengiriman notifikasi preemptive", [
                'nifas_id' => $nifas->id,
                'phase' => $nextPhase['phase_name']
            ]);

            // Cek apakah preemptive notifikasi untuk fase ini sudah pernah dikirim
            $notificationExists = NifasNotification::where('nifas_id', $nifas->id)
                ->where('phase_name', "Pre-{$nextPhase['phase_name']}")
                ->exists();

            if ($notificationExists) {
                Log::info("Notifikasi preemptive untuk fase ini sudah pernah dikirim", [
                    'nifas_id' => $nifas->id,
                    'phase' => $nextPhase['phase_name']
                ]);
                return;
            }

            // Debug: Log user information
            $user = $nifas->user;
            if (!$user) {
                Log::error("User tidak ditemukan untuk nifas", ['nifas_id' => $nifas->id]);
                return;
            }

            Log::info("Mencoba mengirim notifikasi preemptive ke user", [
                'user_id' => $user->id,
                'email' => $user->email,
                'phase' => $nextPhase['phase_name']
            ]);

            // Kirim notifikasi preemptive
            try {
                $user->notify(new NifasPhaseReminder(
                    $nifas,
                    "Persiapan {$nextPhase['phase_name']}",
                    "Besok akan memasuki {$nextPhase['description']}"
                ));
                Log::info("Notifikasi preemptive berhasil dikirim ke user");

                // Simpan record notifikasi
                $notification = NifasNotification::create([
                    'nifas_id' => $nifas->id,
                    'user_id' => $user->id,
                    'phase_name' => "Pre-{$nextPhase['phase_name']}",
                    'sent_at' => now(),
                ]);
                Log::info("Notifikasi preemptive berhasil disimpan ke database", [
                    'notification_id' => $notification->id
                ]);
            } catch (\Exception $e) {
                Log::error("Gagal mengirim notifikasi preemptive", [
                    'error' => $e->getMessage(),
                    'user_id' => $user->id,
                    'email' => $user->email
                ]);
                throw $e;
            }

        } catch (\Exception $e) {
            Log::error("Error saat mengirim notifikasi preemptive", [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            throw $e;
        }
    }
}