<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FaseImunisasi extends Model
{
    //
    protected $fillable = [
        'user_id',
        'nama_fase',
        'waktu_fase',
        'deskripsi_fase',
        'tugas_1',
        'deskripsi_tugas_1',
        'tugas_2',
        'deskripsi_tugas_2',
        'tugas_3',
        'deskripsi_tugas_3',
        'tugas_4',
        'deskripsi_tugas_4',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getNamaFaseAttribute($value)
    {
        return ucfirst($value);
    }

    public function getTugas1Attribute($value)
    {
        return ucfirst($value);
    }
}
