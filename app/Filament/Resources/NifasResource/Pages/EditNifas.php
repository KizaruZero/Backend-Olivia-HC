<?php

namespace App\Filament\Resources\NifasResource\Pages;

use App\Filament\Resources\NifasResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditNifas extends EditRecord
{
    protected static string $resource = NifasResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
