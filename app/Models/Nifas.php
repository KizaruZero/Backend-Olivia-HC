<?php

namespace App\Models;

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

    public function faseNifas()
    {
        return $this->belongsTo(FaseNifas::class);
    }
}
