<?php

namespace App\Filament\Resources\NifasProgressResource\Pages;

use App\Filament\Resources\NifasProgressResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditNifasProgress extends EditRecord
{
    protected static string $resource = NifasProgressResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
