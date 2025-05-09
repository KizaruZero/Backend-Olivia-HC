<?php

namespace App\Filament\Resources;

use App\Filament\Resources\NifasProgressResource\Pages;
use App\Filament\Resources\NifasProgressResource\RelationManagers;
use App\Models\NifasProgress;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class NifasProgressResource extends Resource
{
    protected static ?string $model = NifasProgress::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('nifas_id')
                    ->relationship('nifas.user', 'name')
                    ->required(),
                Forms\Components\Select::make('fase_nifas_id')
                    ->relationship('faseNifas', 'name')
                    ->required(),
                Forms\Components\Toggle::make('is_completed')
                    ->required(),
                Forms\Components\DatePicker::make('completed_at'),
                Forms\Components\TextInput::make('puskesmas')
                    ->maxLength(255),
                Forms\Components\Textarea::make('notes')
                    ->columnSpanFull(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('nifas.user.name')
                    ->sortable(),
                Tables\Columns\TextColumn::make('faseNifas.name')
                    ->sortable(),
                Tables\Columns\IconColumn::make('is_completed')
                    ->boolean(),
                Tables\Columns\TextColumn::make('completed_at')
                    ->date()
                    ->sortable(),
                Tables\Columns\TextColumn::make('puskesmas')
                    ->searchable(),
                Tables\Columns\TextColumn::make('notes')
                    ->limit(50),
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
            'index' => Pages\ListNifasProgress::route('/'),
            'create' => Pages\CreateNifasProgress::route('/create'),
            'edit' => Pages\EditNifasProgress::route('/{record}/edit'),
        ];
    }
}
