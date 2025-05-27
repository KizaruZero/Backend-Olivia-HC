<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\NifasTask;

class NifasTaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tasks = [
            1 => [ // Kunjungan Nifas 1 (6 jam – 48 jam)
                ['name' => 'Periksa ASI', 'description' => 'Pemeriksaan kondisi dan produksi ASI'],
                ['name' => 'Periksa Perdarahan (Lochea) - Rubra', 'description' => 'Pemeriksaan lochea normal berwarna merah segar (hari ke 1-3 pasca persalinan)'],
                ['name' => 'Periksa Perdarahan (Lochea) - Serosa', 'description' => 'Pemeriksaan lochea normal berwarna merah muda kekuningan (hari ke 4-10)'],
                ['name' => 'Periksa Jalan Lahir', 'description' => 'Pemeriksaan jahitan luka jalan lahir dan tanda infeksi'],
                ['name' => 'Pemberian Vitamin A', 'description' => 'Pemberian 1 kapsul setelah persalinan dan 24 jam setelah persalinan'],
                ['name' => 'Konseling', 'description' => 'Konseling kesehatan ibu dan bayi']
            ],

            2 => [ // Kunjungan Nifas 2 (3-7 hari)
                ['name' => 'Periksa ASI', 'description' => 'Pemeriksaan kondisi dan produksi ASI'],
                ['name' => 'Periksa Perdarahan (Lochea) - Rubra', 'description' => 'Pemeriksaan lochea normal berwarna merah segar (hari ke 1-3 pasca persalinan)'],
                ['name' => 'Periksa Jalan Lahir', 'description' => 'Pemeriksaan jahitan luka jalan lahir dan tanda infeksi'],
                ['name' => 'Konseling', 'description' => 'Konseling kesehatan ibu dan bayi']
            ],

            3 => [ // Kunjungan Nifas 3 (8-28 hari)
                ['name' => 'Periksa ASI', 'description' => 'Pemeriksaan kondisi dan produksi ASI'],
                ['name' => 'Periksa Perdarahan (Lochea) - Serosa', 'description' => 'Pemeriksaan lochea normal berwarna merah muda kekuningan (hari ke 4-10)'],
                ['name' => 'Periksa Jalan Lahir', 'description' => 'Pemeriksaan jahitan luka jalan lahir dan tanda infeksi'],
                ['name' => 'Konseling', 'description' => 'Konseling kesehatan ibu dan bayi']
            ],

            4 => [ // Kunjungan Nifas 4 (29-42 hari)
                ['name' => 'Periksa ASI', 'description' => 'Pemeriksaan kondisi dan produksi ASI'],
                ['name' => 'Periksa Perdarahan (Lochea) - Rubra', 'description' => 'Pemeriksaan lochea normal berwarna merah segar (hari ke 1-3 pasca persalinan)'],
                ['name' => 'Periksa Perdarahan (Lochea) - Serosa', 'description' => 'Pemeriksaan lochea normal berwarna merah muda kekuningan (hari ke 4-10)'],
                ['name' => 'Periksa Perdarahan (Lochea) - Alba', 'description' => 'Pemeriksaan lochea normal berwarna putih kekuningan (hari ke 11-2/6 minggu)'],
                ['name' => 'Periksa Jalan Lahir', 'description' => 'Pemeriksaan jahitan luka jalan lahir dan tanda infeksi'],
                ['name' => 'Konseling', 'description' => 'Konseling kesehatan ibu dan bayi']
            ]
        ];

        foreach ($tasks as $faseId => $faseTasks) {
            foreach ($faseTasks as $task) {
                NifasTask::create([
                    'fase_nifas_id' => $faseId,
                    'name' => $task['name'],
                    'description' => $task['description']
                ]);
            }
        }
    }
}
