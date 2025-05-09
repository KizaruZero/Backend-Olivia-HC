<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NifasTaskProgress extends Model
{
    //
    protected $table = 'nifas_task_progress';
    protected $fillable = [
        'nifas_progress_id',
        'nifas_task_id',
        'is_completed',
        'completed_at',
    ];

    public function faseNifas()
    {
        return $this->belongsTo(FaseNifas::class);
    }

    public function nifasTask()
    {
        return $this->belongsTo(NifasTask::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function nifas()
    {
        return $this->belongsTo(Nifas::class);
    }

    public function userStats()
    {
        return $this->belongsTo(UserStats::class);
    }

    public function nifasProgress()
    {
        return $this->belongsTo(NifasProgress::class);
    }

    public function nifasTaskProgress()
    {
        return $this->hasMany(NifasTaskProgress::class);
    }
}
