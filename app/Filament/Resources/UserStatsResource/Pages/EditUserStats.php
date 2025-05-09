<?php

namespace App\Filament\Resources\UserStatsResource\Pages;

use App\Filament\Resources\UserStatsResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditUserStats extends EditRecord
{
    protected static string $resource = UserStatsResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
