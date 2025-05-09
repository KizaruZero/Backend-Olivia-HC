<?php

namespace App\Filament\Resources\FaseNifasResource\Pages;

use App\Filament\Resources\FaseNifasResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListFaseNifas extends ListRecords
{
    protected static string $resource = FaseNifasResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
