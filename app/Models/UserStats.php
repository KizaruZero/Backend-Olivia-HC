<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserStats extends Model
{
    //
    protected $fillable = [
        'user_id',
        'completed_tasks_count',
        'completed_kf_count',
        'total_points',
        'streak_days',
    ];
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function nifasProgress()
    {
        return $this->hasMany(NifasProgress::class);
    }       

    public function nifasTaskProgress()
    {
        return $this->hasMany(NifasTaskProgress::class);
    }

    public function nifas()
    {
        return $this->hasMany(Nifas::class);
    }
}
