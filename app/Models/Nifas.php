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

class Nifas extends Model
{
    protected $fillable = [
        'user_id',
        'start_date',
        'end_date',
        'is_active',
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
                $nifas->end_date = Carbon::parse($nifas->start_date)->addDays(40);
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

        static::created(function ($nifas) {
            // For newly created records, check if we need to send initial reminder
            self::checkAndSendReminder($nifas);
        });

        static::updated(function ($nifas) {
            // For updated records, check if we need to send reminder
            self::checkAndSendReminder($nifas);
        });
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







}
