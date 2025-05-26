<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class KB extends Model
{
    //
    protected $fillable = [
        'user_id',
        'start_date',
        'end_date',
        'tipe_kb',
        'catatan',
        'status_kb',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getTipeKbAttribute($value)
    {
        return ucfirst($value);
    }

    public function getStatusKbAttribute($value)
    {
        return ucfirst($value);
    }
}
