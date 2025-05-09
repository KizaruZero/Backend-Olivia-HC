<?php

namespace App\Filament\Resources\FaseNifasResource\Pages;

use App\Filament\Resources\FaseNifasResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditFaseNifas extends EditRecord
{
    protected static string $resource = FaseNifasResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
