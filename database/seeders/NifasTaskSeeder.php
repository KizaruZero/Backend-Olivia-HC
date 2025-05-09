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
        //
        $tasks = [
            // KF1 (0-6 hari)
            1 => [
                ['name' => 'Pemeriksaan tanda vital', 'description' => 'Periksa tekanan darah, nadi, suhu, dan pernapasan'],
                ['name' => 'Penilaian perdarahan', 'description' => 'Pantau jumlah dan warna lokia'],
                ['name' => 'Perawatan luka jahitan', 'description' => 'Bersihkan dan evaluasi luka perineum/sectio'],
                ['name' => 'Edukasi perawatan bayi', 'description' => 'Ajarkan teknik menyusui dan perawatan tali pusat']
            ],
            
            // KF2 (7-14 hari)
            2 => [
                ['name' => 'Penilaian involusi uteri', 'description' => 'Periksa tinggi fundus uteri'],
                ['name' => 'Evaluasi laktasi', 'description' => 'Pantau produksi ASI dan teknik menyusui'],
                ['name' => 'Skrining depresi postpartum', 'description' => 'Lakukan wawancara tentang kondisi psikologis'],
                ['name' => 'Edukasi KB pasca persalinan', 'description' => 'Berikan informasi kontrasepsi yang sesuai']
            ],
            
            // KF3 (15-28 hari)
            3 => [
                ['name' => 'Pemeriksaan hemoglobin', 'description' => 'Evaluasi kadar Hb untuk deteksi anemia'],
                ['name' => 'Penilaian penyembuhan luka', 'description' => 'Periksa kondisi luka jahitan'],
                ['name' => 'Evaluasi tumbuh kembang bayi', 'description' => 'Pantau berat badan dan refleks bayi'],
                ['name' => 'Konseling nutrisi', 'description' => 'Berikan panduan gizi untuk ibu menyusui']
            ],
            
            // KF4 (29-40 hari)
            4 => [
                ['name' => 'Pemeriksaan lengkap postpartum', 'description' => 'Evaluasi fisik komprehensif'],
                ['name' => 'Tes Pap smear (jika diperlukan)', 'description' => 'Untuk deteksi dini kanker serviks'],
                ['name' => 'Pemantauan KB yang digunakan', 'description' => 'Evaluasi efek samping kontrasepsi'],
                ['name' => 'Persiapan kembali bekerja', 'description' => 'Konseling manajemen ASI perah']
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
