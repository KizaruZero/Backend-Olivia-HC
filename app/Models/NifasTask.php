<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NifasTask extends Model
{
    //
    protected $fillable = [
        'fase_nifas_id',
        'name',
        'description',
    ];


    public function faseNifas()
    {
        return $this->belongsTo(FaseNifas::class);
    }

    public function nifasTaskProgress() 
    {
        return $this->hasMany(NifasTaskProgress::class);
    }

    public function nifas()
    {
        return $this->hasMany(Nifas::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function userStats()
    {
        return $this->belongsTo(UserStats::class);
    }

    public function nifasProgress()
    {
        return $this->belongsTo(NifasProgress::class);
    }
    
    
}
