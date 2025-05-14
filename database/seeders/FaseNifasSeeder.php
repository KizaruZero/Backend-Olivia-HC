<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\FaseNifas;
class FaseNifasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $faseNifas = [
            [
                'name' => 'Fase Akut',
                'start_day' => 0,
                'end_day' => 1,
                'description' => "Fase kritis dalam 24 jam pertama setelah persalinan, fokus pada pemantauan tanda vital, kontraksi rahim, perdarahan, dan inisiasi menyusui dini.",
                'video_url' => 'https://www.youtube.com/watch?v=UJ76qKD12LU',
                'leaflet_url' => 'https://www.google.com',
                'article_url' => 'https://www.google.com',
                'twibbon_image' => 'twibbon/fase1.png',
                'border_style' => 'border-primary',
            ],
            [
                'name' => 'Fase Awal',
                'start_day' => 2,
                'end_day' => 7,
                'description' => "Fase pemulihan awal dengan fokus pada pemantauan involusi uterus, perawatan luka, produksi ASI, serta pencegahan infeksi dan gangguan psikologis.",
                'video_url' => 'https://www.youtube.com/watch?v=UJ76qKD12LU',
                'leaflet_url' => 'https://www.google.com',
                'article_url' => 'https://www.google.com',
                'twibbon_image' => 'twibbon/fase2.png',
                'border_style' => 'border-warning',
            ],
            [
                'name' => 'Fase Akhir',
                'start_day' => 8,
                'end_day' => 42,
                'description' => "Fase pemulihan lanjutan hingga 6 minggu postpartum untuk pemulihan menyeluruh, konseling KB, kesehatan mental, dan adaptasi peran sebagai ibu.",
                'video_url' => 'https://www.youtube.com/watch?v=UJ76qKD12LU',
                'leaflet_url' => 'https://www.google.com',
                'article_url' => 'https://www.google.com',
                'twibbon_image' => 'twibbon/fase3.png',
                'border_style' => 'border-success',
            ],
        ];


        foreach ($faseNifas as $faseNifa) {
            FaseNifas::create($faseNifa);
        }
    }
}
