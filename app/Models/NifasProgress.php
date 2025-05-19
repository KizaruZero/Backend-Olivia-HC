<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NifasProgress extends Model
{
    //
    protected $table = 'nifas_progress';
    protected $fillable = [
        'nifas_id',
        'fase_nifas_id',
        'is_completed',
        'completed_at',
        'tanggal_periksa',
        'puskesmas',
        'notes',
    ];

    protected $casts = [
        'tanggal_periksa' => 'date',
    ];

    public function nifas()
    {
        return $this->belongsTo(Nifas::class);
    }

    public function tasks()
    {
        return $this->belongsToMany(NifasTask::class, 'nifas_task_progress')
            ->withPivot('is_completed', 'completed_at')
            ->withTimestamps();
    }

    public function faseNifas()
    {
        return $this->belongsTo(FaseNifas::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
