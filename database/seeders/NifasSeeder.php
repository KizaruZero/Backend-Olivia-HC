<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Nifas;
class NifasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $nifas = [
            [
                'user_id' => 3,
                'start_date' => '2025-01-01',
                'end_date' => '2025-02-07',
                'is_active' => true,
            ],
        ];

        foreach ($nifas as $nifas) {
            Nifas::create($nifas);
        }
    }
}
