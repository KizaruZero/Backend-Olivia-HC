<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Nifas;

class CheckNifasPhases extends Command
{
    protected $signature = 'nifas:check-phases';
    protected $description = 'Check nifas phases and send reminders';

    public function handle()
    {
        $activeNifas = Nifas::where('is_active', true)->get();

        foreach ($activeNifas as $nifas) {
            Nifas::checkAndSendReminder($nifas);
        }

        $this->info('Nifas phase check completed.');
    }
}