<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KB extends Model
{
    use HasFactory;

    //
    protected $fillable = [
        'user_id',
        'start_date',
        'end_date',
        'tipe_kb',
        'catatan',
        'status_kb',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date'
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
