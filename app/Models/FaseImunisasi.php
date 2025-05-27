<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FaseImunisasi extends Model
{
    //
    protected $fillable = [
        'imunisasi_id',
        'nama_fase',
        'waktu_fase',
        'deskripsi_fase',
        'tugas_1',
        'deskripsi_tugas_1',
        'tugas_1_status',
        'tugas_1_tanggal',
        'tugas_1_catatan',
        'tugas_2',
        'deskripsi_tugas_2',
        'tugas_2_status',
        'tugas_2_tanggal',
        'tugas_2_catatan',
        'tugas_3',
        'deskripsi_tugas_3',
        'tugas_3_status',
        'tugas_3_tanggal',
        'tugas_3_catatan',
        'tugas_4',
        'deskripsi_tugas_4',
        'tugas_4_status',
        'tugas_4_tanggal',
        'tugas_4_catatan',
        'is_complete'
    ];


    public function imunisasi()
    {
        return $this->belongsTo(Imunisasi::class);
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
