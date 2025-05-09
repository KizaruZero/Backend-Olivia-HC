<?php

namespace App\Filament\Resources\UserStatsResource\Pages;

use App\Filament\Resources\UserStatsResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListUserStats extends ListRecords
{
    protected static string $resource = UserStatsResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
