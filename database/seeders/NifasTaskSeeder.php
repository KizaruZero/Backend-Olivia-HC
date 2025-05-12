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
            1 => [ // Fase Akut (0–24 jam postpartum)
                ['name' => 'Periksa tanda vital', 'description' => 'Pantau tekanan darah, suhu, nadi, dan napas secara berkala'],
                ['name' => 'Observasi kontraksi dan lokia', 'description' => 'Pantau kontraksi rahim dan pengeluaran lokia'],
                ['name' => 'Periksa luka persalinan', 'description' => 'Cek kondisi luka jahitan atau bekas operasi caesar'],
                ['name' => 'Inisiasi Menyusui Dini (IMD)', 'description' => 'Lakukan kontak kulit ke kulit dan bantu pelekatan awal'],
                ['name' => 'Edukasi menyusui', 'description' => 'Ajarkan posisi dan pelekatan menyusui yang benar'],
                ['name' => 'Pantau kondisi mental ibu', 'description' => 'Identifikasi tanda stres atau baby blues'],
                ['name' => 'Anjurkan istirahat dan makan bergizi', 'description' => 'Pastikan ibu mendapat istirahat cukup dan nutrisi seimbang'],
                ['name' => 'Pantau buang air kecil ibu', 'description' => 'Pastikan ibu dapat BAK dalam 6 jam pertama']
            ],

            2 => [ // Fase Awal (1–7 hari postpartum)
                ['name' => 'Pantau lokia harian', 'description' => 'Amati jumlah, warna, dan bau lokia setiap hari'],
                ['name' => 'Rawat luka perineum/operasi', 'description' => 'Jaga kebersihan luka dan berikan perawatan bila perlu'],
                ['name' => 'Lanjutkan menyusui eksklusif', 'description' => 'Berikan ASI setiap 2–3 jam dan pantau respons bayi'],
                ['name' => 'Cegah sembelit', 'description' => 'Anjurkan konsumsi serat dan cairan yang cukup'],
                ['name' => 'Perawatan payudara', 'description' => 'Gunakan kompres hangat jika payudara bengkak atau nyeri'],
                ['name' => 'Kenali tanda bahaya', 'description' => 'Edukasi ibu dan keluarga tentang demam, nyeri hebat, dan perdarahan berlebih'],
                ['name' => 'Libatkan keluarga', 'description' => 'Ajak suami/keluarga untuk bantu perawatan ibu dan bayi']
            ],

            3 => [ // Fase Akhir (8 hari – 6 minggu postpartum)
                ['name' => 'Pemeriksaan lanjutan', 'description' => 'Datangi fasilitas kesehatan untuk pemeriksaan hari ke-6 dan ke-42'],
                ['name' => 'Skrining kesehatan mental', 'description' => 'Cek gejala depresi postpartum atau perubahan suasana hati'],
                ['name' => 'Latihan ringan dan senam nifas', 'description' => 'Anjurkan gerakan ringan untuk pemulihan otot dasar panggul'],
                ['name' => 'Diskusi KB', 'description' => 'Diskusikan pilihan kontrasepsi sesuai kebutuhan ibu'],
                ['name' => 'Lanjutkan pola hidup sehat', 'description' => 'Pertahankan pola makan bergizi dan istirahat cukup'],
                ['name' => 'Perawatan diri', 'description' => 'Jaga kebersihan tubuh dan organ intim'],
                ['name' => 'Adaptasi peran ibu', 'description' => 'Berikan tips manajemen stres dan pola tidur bayi']
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
