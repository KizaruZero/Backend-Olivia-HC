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
                'name' => 'Fase 1',
                'start_day' => 0,
                'end_day' => 14,
                'description' => "Periode kritis pasca-melahirkan yang memerlukan pemantauan ketat terhadap perdarahan, tekanan darah, dan kontraksi rahim",
                'video_url' => 'https://www.youtube.com/watch?v=UJ76qKD12LU',
                'leaflet_url' => 'https://www.google.com',
                'article_url' => 'https://www.google.com',
                'twibbon_image' => 'twibbon/kf1.png',
                'border_style' => 'border-primary',
            ],
            [
                'name' => 'Fase 2',
                'start_day' => 15,
                'end_day' => 28,
                'description' => "Fase pemulihan awal dengan fokus pada perawatan luka, manajemen nyeri, dan inisiasi menyusui",
                'video_url' => 'https://www.youtube.com/watch?v=UJ76qKD12LU',
                'leaflet_url' => 'https://www.google.com',
                'article_url' => 'https://www.google.com',
                'twibbon_image' => 'twibbon/kf2.png',
                'border_style' => 'border-secondary',
            ],
            [
                'name' => 'Fase 3',
                'start_day' => 29,
                'end_day' => 42,
                'description' => "Fase pemulihan lanjut dengan fokus pada pemulihan fisik, pemulihan kesehatan, dan pengembangan keterampilan menyusui",
                'video_url' => 'https://www.youtube.com/watch?v=UJ76qKD12LU',
                'leaflet_url' => 'https://www.google.com',
                'article_url' => 'https://www.google.com',
                'twibbon_image' => 'twibbon/kf3.png',
                'border_style' => 'border-success',
            ],

            [
                'name' => 'Fase 4',
                'start_day' => 43,
                'end_day' => 56,
                'description' => "Fase pemulihan lanjut dengan fokus pada pemulihan fisik, pemulihan kesehatan, dan pengembangan keterampilan menyusui",
                'video_url' => 'https://www.youtube.com/watch?v=UJ76qKD12LU',
                'leaflet_url' => 'https://www.google.com',
                'article_url' => 'https://www.google.com',
                'twibbon_image' => 'twibbon/kf4.png',
                'border_style' => 'border-danger',
            ],
            
            

        ];

        foreach ($faseNifas as $faseNifa) {
            FaseNifas::create($faseNifa);
        }
    }
}
