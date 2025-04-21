<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kehamilan extends Model
{
    use HasFactory;

    protected $table = 'kehamilans';

    protected $fillable = [
        'user_id',
        'last_periode_date',
        'estimated_due_date',
        'is_active',
        'status',
        'delivered_date',
        'miscarriage_week',
        'is_nifas_complete',
        'notes',
    ];

    protected $casts = [
        'last_periode_date' => 'date',
        'estimated_due_date' => 'date',
        'delivered_date' => 'date',
        'is_active' => 'boolean',
        'is_nifas_complete' => 'boolean',
    ];

    /**
     * Relasi ke model User
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function notes()
    {
        return $this->hasMany(Notes::class);
    }

    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }

}
