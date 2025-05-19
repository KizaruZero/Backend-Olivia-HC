<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Nifas;
use App\Models\NifasTask;
use App\Models\NifasTaskProgress;
use App\Models\NifasNotification;

class FaseNifas extends Model
{
    //
    protected $fillable = [
        'name',
        'start_day',
        'end_day',
        'description',
        'video_url',
        'leaflet_url',
        'article_url',
        'twibbon_image',
        'border_style',
    ];

    public function nifas()
    {
        return $this->hasMany(Nifas::class);
    }

    public function nifasTask()
    {
        return $this->hasMany(NifasTask::class);
    }

    public function nifasTaskProgress()
    {
        return $this->hasMany(NifasTaskProgress::class);
    }

    public function notifications()
    {
        return $this->hasMany(NifasNotification::class);
    }

    /**
     * Definisi statis untuk tahapan nifas
     */
    public static function getPhases()
    {
        return [
            [
                'phase_name' => 'KF 1',
                'start_day' => 0, // 6 jam
                'end_day' => 2,  // 48 jam
                'description' => 'Kunjungan Nifas 1 (6 jam - 48 jam)',
            ],
            [
                'phase_name' => 'KF 2',
                'start_day' => 3,
                'end_day' => 7,
                'description' => 'Kunjungan Nifas 2 (3-7 hari)',
            ],
            [
                'phase_name' => 'KF 3',
                'start_day' => 8,
                'end_day' => 28,
                'description' => 'Kunjungan Nifas 3 (8-28 hari)',
            ],
            [
                'phase_name' => 'KF 4',
                'start_day' => 29,
                'end_day' => 42,
                'description' => 'Kunjungan Nifas 4 (29-42 hari)',
            ],
        ];
    }

    /**
     * Mendapatkan fase selanjutnya dari fase saat ini
     */
    public static function getNextPhase($currentPhase)
    {
        $phases = self::getPhases();
        foreach ($phases as $index => $phase) {
            if ($phase['phase_name'] === $currentPhase && isset($phases[$index + 1])) {
                return $phases[$index + 1];
            }
        }
        return null;
    }

    /**
     * Mendapatkan fase berdasarkan hari
     */
    public static function getPhaseByDay($day)
    {
        foreach (self::getPhases() as $phase) {
            if ($day >= $phase['start_day'] && $day <= $phase['end_day']) {
                return $phase;
            }
        }

        return null;
    }


}
