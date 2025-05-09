<?php

namespace App\Filament\Resources\NifasTaskResource\Pages;

use App\Filament\Resources\NifasTaskResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditNifasTask extends EditRecord
{
    protected static string $resource = NifasTaskResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
