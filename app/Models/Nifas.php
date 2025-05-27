<?php

namespace App\Models;
use App\Models\NifasTask;
use App\Models\NifasProgress;
use App\Models\NifasTaskProgress;
use App\Models\FaseNifas;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use App\Mail\NifasPhaseReminder;
use DateTime;
use DateInterval;
use Twilio\Rest\Client;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Database\Eloquent\Model;
use App\Models\Imunisasi;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class Nifas extends Model
{
    protected $fillable = [
        'user_id',
        'start_date',
        'end_date',
        'is_active',
        'is_completed',
        'completed_at',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'is_active' => 'boolean',
        'is_completed' => 'boolean',
        'completed_at' => 'date',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($nifas) {
            if (!$nifas->end_date) {
                $nifas->end_date = Carbon::parse($nifas->start_date)->addDays(42);
            }
        });

        static::created(function ($nifas) {
            // Get all fase nifas (assuming you have 4 phases)
            $faseNifas = FaseNifas::all();

            foreach ($faseNifas as $fase) {
                $nifasProgress = NifasProgress::create([
                    'nifas_id' => $nifas->id,
                    'fase_nifas_id' => $fase->id,
                    'is_completed' => false,
                ]);

                $nifasTasks = NifasTask::where('fase_nifas_id', $fase->id)->get();
                foreach ($nifasTasks as $task) {
                    NifasTaskProgress::create([
                        'nifas_progress_id' => $nifasProgress->id,
                        'nifas_task_id' => $task->id,
                        'is_completed' => false,
                    ]);
                }
            }
        });

        static::updated(function ($nifas) {
            if ($nifas->is_active && $nifas->wasChanged('is_active')) {
                // Pastikan hanya satu nifas yang aktif per user
                Nifas::where('user_id', $nifas->user_id)
                    ->where('id', '!=', $nifas->id)
                    ->update(['is_active' => false]);
            }
        });

        static::updated(function ($nifas) {
            if ($nifas->is_completed && $nifas->wasChanged('is_completed')) {
                try {
                    DB::beginTransaction();

                    // Nonaktifkan imunisasi aktif lainnya
                    Imunisasi::where('user_id', $nifas->user_id)
                        ->where('is_active', true)
                        ->update(['is_active' => false]);

                    // Buat imunisasi baru
                    Imunisasi::create([
                        'user_id' => $nifas->user_id,
                        'start_date' => Carbon::now(),
                        'is_active' => true,
                        'is_completed' => false,
                    ]);

                    DB::commit();
                } catch (\Exception $e) {
                    DB::rollBack();
                    Log::error('Failed to create Imunisasi after Nifas completion: ' . $e->getMessage(), [
                        'nifas_id' => $nifas->id,
                        'user_id' => $nifas->user_id,
                        'error' => $e->getMessage()
                    ]);
                }
            }
        });

    }

    public function nifasNotification()
    {
        return $this->hasMany(NifasNotification::class);
    }

    public function faseNifas()
    {
        return $this->belongsTo(FaseNifas::class);
    }

    public function nifasProgress()
    {
        return $this->hasMany(NifasProgress::class);
    }

    public function tasks()
    {
        return $this->hasMany(NifasTask::class);
    }

    public function taskProgress()
    {
        return $this->hasMany(NifasTaskProgress::class);
    }

    public function getIsInProgressAttribute()
    {
        $today = Carbon::today();
        return $today->between($this->start_date, $this->end_date);
    }

    public static function calculateNifasPhase($daysPassed)
    {
        if ($daysPassed <= 2)
            return 1;
        if ($daysPassed <= 7)
            return 2;
        if ($daysPassed <= 28)
            return 3;
        if ($daysPassed <= 42)
            return 4;
        return 0; // Nifas period ended
    }

    public static function checkAndSendReminder($nifas)
    {
        if (!$nifas->is_active) {
            Log::info('Nifas is not active', ['nifas_id' => $nifas->id]);
            return;
        }

        $startDate = Carbon::parse($nifas->start_date);
        $daysPassed = $startDate->diffInDays(now());
        $currentPhase = self::calculateNifasPhase($daysPassed);

        Log::info('Checking nifas phase', [
            'nifas_id' => $nifas->id,
            'days_passed' => $daysPassed,
            'current_phase' => $currentPhase,
            'last_phase_checked' => $nifas->last_phase_checked
        ]);

        // If phase hasn't changed, don't send reminder
        if ($nifas->last_phase_checked == $currentPhase) {
            Log::info('Phase has not changed', ['nifas_id' => $nifas->id]);
            return;
        }

        // Update the last checked phase
        $nifas->last_phase_checked = $currentPhase;
        $nifas->save();

        // If nifas period has ended, don't send reminder
        if ($currentPhase === 0) {
            Log::info('Nifas period has ended', ['nifas_id' => $nifas->id]);
            return;
        }

        // Send email reminder
        $user = $nifas->user;
        $message = "Selamat datang di fase nifas ke-" . $currentPhase . "!\n\n";

        switch ($currentPhase) {
            case 1:
                $message .= "Jangan lupa untuk melakukan pemeriksaan di puskesmas terdekat. Ini adalah fase awal masa nifas Anda.";
                break;
            case 2:
                $message .= "Anda telah memasuki fase kedua masa nifas. Tetap jaga kesehatan dan lakukan pemeriksaan rutin.";
                break;
            case 3:
                $message .= "Selamat memasuki fase ketiga masa nifas. Terus pantau kesehatan Anda dan konsultasikan dengan bidan.";
                break;
            case 4:
                $message .= "Anda telah memasuki fase terakhir masa nifas. Tetap jaga kesehatan dan lakukan pemeriksaan akhir.";
                break;
        }

        try {
            Mail::to($user->email)->send(new NifasPhaseReminder($message));
            Log::info('Email sent successfully', [
                'nifas_id' => $nifas->id,
                'user_email' => $user->email,
                'phase' => $currentPhase
            ]);
        } catch (\Exception $e) {
            Log::error('Failed to send email', [
                'nifas_id' => $nifas->id,
                'error' => $e->getMessage()
            ]);
        }
    }
}
