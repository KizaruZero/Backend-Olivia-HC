<?php

namespace App\Filament\Resources\NifasTaskProgressResource\Pages;

use App\Filament\Resources\NifasTaskProgressResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditNifasTaskProgress extends EditRecord
{
    protected static string $resource = NifasTaskProgressResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
