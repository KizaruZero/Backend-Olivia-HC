<?php

namespace App\Filament\Resources\NifasTaskResource\Pages;

use App\Filament\Resources\NifasTaskResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListNifasTasks extends ListRecords
{
    protected static string $resource = NifasTaskResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
