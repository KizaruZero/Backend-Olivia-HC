<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    use HasFactory;

    protected $table = 'appointments';

    protected $fillable = [
        'kehamilan_id',
        'title',
        'appointment_date',
        'provider_name',    
        'location',
        'reminder_status',
        'notes',
    ];

    protected $casts = [
        'appointment_date' => 'date',
    ];

    /**
     * Relasi ke model Kehamilan
     */
    public function kehamilan()
    {
        return $this->belongsTo(Kehamilan::class);
    }
}
