<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NifasProgress extends Model
{
    //
    protected $fillable = [
        'nifas_id',
        'fase_nifas_id',
        'is_completed',
        'completed_at',
        'puskesmas',
        'notes',
    ];

    public function nifas()
    {
        return $this->belongsTo(Nifas::class);
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
