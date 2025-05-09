<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FaseNifas extends Model
{
    //
    protected $fillable = [
        'name',
        'start_day',
        'end_day',
        'description',
        'twibbon_image',
        'border_style',
    ];

    public function nifas()
    {
        return $this->hasMany(Nifas::class);
    }

    public function nifasTask()
    {
        return $this->hasMany(NifasTask::class);
    }

    public function nifasTaskProgress()
    {
        return $this->hasMany(NifasTaskProgress::class);
    }
    
    
}
