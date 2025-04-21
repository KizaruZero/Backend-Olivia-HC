<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notes extends Model
{
    use HasFactory;

    protected $table = 'daily_notes';

    protected $fillable = [
        'kehamilan_id',
        'notes_date',
        'notes_time',
        'mood',
        'stress_level',
        'stress_cause',
        'weight',
        'daily_activities',
        'gejala_fisik',
        'additional_notes',
        'photo_path',
        'baby_movement_frequency',
        'baby_movement_time',
        'movement_counter',
        'breast_condition',
        'wound_condition',
        'lochia_color',
        'lochia_amount',
        'lochia_smell',
    ];

    protected $casts = [
        'notes_date' => 'date',
        'notes_time' => 'datetime:H:i',
        'daily_activities' => 'array',
        'gejala_fisik' => 'array',
        'weight' => 'decimal:2',
    ];

    /**
     * Relasi ke model Kehamilan
     */
    public function kehamilan()
    {
        return $this->belongsTo(Kehamilan::class);
    }
}
