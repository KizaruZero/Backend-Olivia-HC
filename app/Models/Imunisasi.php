<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Imunisasi extends Model
{
    //
    protected $fillable = [
        'user_id',
        'start_date',
        'is_active',
        'is_completed',
        'completed_at',
    ];

    protected static function boot()
    {
        parent::boot();

        // Create all immunization phases when a new immunization record is created
        static::created(function ($imunisasi) {
            foreach ($imunisasi->dataFaseImunisasi() as $fase) {
                FaseImunisasi::create([
                    'imunisasi_id' => $imunisasi->id,
                    'nama_fase' => $fase['nama_fase'],
                    'waktu_fase' => $fase['waktu_fase'],
                    'deskripsi_fase' => $fase['deskripsi_fase'],
                    'tugas_1' => $fase['tugas_1'] ?? null,
                    'deskripsi_tugas_1' => $fase['deskripsi_tugas_1'] ?? null,
                    'tugas_2' => $fase['tugas_2'] ?? null,
                    'deskripsi_tugas_2' => $fase['deskripsi_tugas_2'] ?? null,
                    'tugas_3' => $fase['tugas_3'] ?? null,
                    'deskripsi_tugas_3' => $fase['deskripsi_tugas_3'] ?? null,
                    'tugas_4' => $fase['tugas_4'] ?? null,
                    'deskripsi_tugas_4' => $fase['deskripsi_tugas_4'] ?? null,
                    'is_complete' => false,
                ]);
            }
        });
    }

    public function faseImunisasi()
    {
        return $this->hasMany(FaseImunisasi::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }


    public function dataFaseImunisasi()
    {
        return [
            [
                'nama_fase' => 'Fase 1',
                'waktu_fase' => '0-1 bulan',
                'deskripsi_fase' => 'Imunisasi Dasar',
                'tugas_1' => 'HEPATITIS B',
                'deskripsi_tugas_1' => 'Vaksin Hepatitis B untuk mencegah infeksi virus hepatitis B',
                'tugas_2' => 'BCG',
                'deskripsi_tugas_2' => 'Vaksin BCG untuk mencegah tuberkulosis',
                'tugas_3' => 'POLIO TETES 1',
                'deskripsi_tugas_3' => 'Vaksin Polio tetes pertama untuk mencegah polio',
            ],
            [
                'nama_fase' => 'Fase 2',
                'waktu_fase' => '2 bulan',
                'deskripsi_fase' => 'Imunisasi Lanjutan',
                'tugas_1' => 'DPT-HB-HIB 1',
                'deskripsi_tugas_1' => 'Vaksin kombinasi untuk mencegah difteri, pertusis, tetanus, hepatitis B, dan Hib',
                'tugas_2' => 'POLIO TETES 2',
                'deskripsi_tugas_2' => 'Vaksin Polio tetes kedua',
                'tugas_3' => 'ROTA VIRUS (RV) 1',
                'deskripsi_tugas_3' => 'Vaksin Rotavirus pertama untuk mencegah diare akibat rotavirus',
                'tugas_4' => 'PCV 1',
                'deskripsi_tugas_4' => 'Vaksin Pneumokokus pertama untuk mencegah infeksi pneumokokus',
            ],
            [
                'nama_fase' => 'Fase 3',
                'waktu_fase' => '3 bulan',
                'deskripsi_fase' => 'Imunisasi Lanjutan',
                'tugas_1' => 'DPT-HB-HIB 2',
                'deskripsi_tugas_1' => 'Vaksin kombinasi kedua untuk mencegah difteri, pertusis, tetanus, hepatitis B, dan Hib',
                'tugas_2' => 'POLIO TETES 3',
                'deskripsi_tugas_2' => 'Vaksin Polio tetes ketiga',
                'tugas_3' => 'ROTA VIRUS (RV) 2',
                'deskripsi_tugas_3' => 'Vaksin Rotavirus kedua',
                'tugas_4' => 'PCV 2',
                'deskripsi_tugas_4' => 'Vaksin Pneumokokus kedua',
            ],
            [
                'nama_fase' => 'Fase 4',
                'waktu_fase' => '4 bulan',
                'deskripsi_fase' => 'Imunisasi Lanjutan',
                'tugas_1' => 'DPT-HB-HIB 3',
                'deskripsi_tugas_1' => 'Vaksin kombinasi ketiga untuk mencegah difteri, pertusis, tetanus, hepatitis B, dan Hib',
                'tugas_2' => 'POLIO TETES 4',
                'deskripsi_tugas_2' => 'Vaksin Polio tetes keempat',
                'tugas_3' => 'POLIO SUNTIK (IPV) 1',
                'deskripsi_tugas_3' => 'Vaksin Polio suntik pertama',
                'tugas_4' => 'ROTA VIRUS (RV) 3',
                'deskripsi_tugas_4' => 'Vaksin Rotavirus ketiga',
            ],
            [
                'nama_fase' => 'Fase 5',
                'waktu_fase' => '9 bulan',
                'deskripsi_fase' => 'Imunisasi Lanjutan',
                'tugas_1' => 'CAMPAK RUBELA (MR)',
                'deskripsi_tugas_1' => 'Vaksin Campak Rubela untuk mencegah campak dan rubela',
                'tugas_2' => 'POLIO SUNTIK (IPV) 2',
                'deskripsi_tugas_2' => 'Vaksin Polio suntik kedua',
            ],
            [
                'nama_fase' => 'Fase 6',
                'waktu_fase' => '10 bulan',
                'deskripsi_fase' => 'Imunisasi Lanjutan',
                'tugas_1' => 'JAPANESE ENCEPHALITIS (JE)',
                'deskripsi_tugas_1' => 'Vaksin Japanese Encephalitis untuk mencegah radang otak akibat virus JE',
            ],
            [
                'nama_fase' => 'Fase 7',
                'waktu_fase' => '12 bulan',
                'deskripsi_fase' => 'Imunisasi Lanjutan',
                'tugas_1' => 'PCV 3',
                'deskripsi_tugas_1' => 'Vaksin Pneumokokus ketiga',
            ],
            [
                'nama_fase' => 'Fase 8',
                'waktu_fase' => '18 bulan',
                'deskripsi_fase' => 'Imunisasi Lanjutan',
                'tugas_1' => 'DPT-HB-HIB lanjutan',
                'deskripsi_tugas_1' => 'Vaksin kombinasi lanjutan untuk mencegah difteri, pertusis, tetanus, hepatitis B, dan Hib',
                'tugas_2' => 'CAMPAK RUBELA (MR) lanjutan',
                'deskripsi_tugas_2' => 'Vaksin Campak Rubela lanjutan',
            ],
        ];
    }

}
