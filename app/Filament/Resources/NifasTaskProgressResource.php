<?php

namespace App\Filament\Resources;

use App\Filament\Resources\NifasTaskProgressResource\Pages;
use App\Filament\Resources\NifasTaskProgressResource\RelationManagers;
use App\Models\NifasTaskProgress;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class NifasTaskProgressResource extends Resource
{
    protected static ?string $model = NifasTaskProgress::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('nifas_progress_id')
                    ->relationship('nifasProgress', 'id')
                    ->required(),
                Forms\Components\Select::make('nifas_task_id')
                    ->relationship('nifasTask', 'name')
                    ->required(),
                Forms\Components\Toggle::make('is_completed')
                    ->required(),
                Forms\Components\DatePicker::make('completed_at'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('nifasProgress.nifas.user.name')
                    ->sortable(),
                Tables\Columns\TextColumn::make('nifasProgress.faseNifas.name')
                    ->sortable(),
                Tables\Columns\TextColumn::make('nifasTask.name')
                    ->sortable(),
                Tables\Columns\IconColumn::make('is_completed')
                    ->boolean(),
                Tables\Columns\TextColumn::make('completed_at')
                    ->date()
                    ->sortable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListNifasTaskProgress::route('/'),
            'create' => Pages\CreateNifasTaskProgress::route('/create'),
            'edit' => Pages\EditNifasTaskProgress::route('/{record}/edit'),
        ];
    }
}
