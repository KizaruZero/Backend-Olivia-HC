<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NifasNotification extends Model
{
    protected $fillable = [
        'nifas_id',
        'user_id',
        'phase_name',
        'sent_at',
    ];

    protected $casts = [
        'sent_at' => 'datetime',
    ];

    public function nifas()
    {
        return $this->belongsTo(Nifas::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}