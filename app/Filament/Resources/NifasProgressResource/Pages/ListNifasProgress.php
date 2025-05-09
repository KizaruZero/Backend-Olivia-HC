<?php

namespace App\Filament\Resources\NifasProgressResource\Pages;

use App\Filament\Resources\NifasProgressResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListNifasProgress extends ListRecords
{
    protected static string $resource = NifasProgressResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
