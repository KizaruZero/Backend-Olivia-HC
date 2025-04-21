<?php

namespace App\Filament\Resources;

use App\Filament\Resources\NotesResource\Pages;
use App\Filament\Resources\NotesResource\RelationManagers;
use App\Models\Notes;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class NotesResource extends Resource
{
    protected static ?string $model = Notes::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('kehamilan_id')
                    ->required()
                    ->numeric(),
                Forms\Components\DatePicker::make('notes_date')
                    ->required(),
                Forms\Components\TextInput::make('notes_time'),
                Forms\Components\TextInput::make('mood'),
                Forms\Components\TextInput::make('stress_level'),
                Forms\Components\TextInput::make('stress_cause'),
                Forms\Components\TextInput::make('weight')
                    ->numeric(),
                Forms\Components\TextInput::make('daily_activities'),
                Forms\Components\TextInput::make('gejala_fisik'),
                Forms\Components\TextInput::make('additional_notes')
                    ->maxLength(255),
                Forms\Components\TextInput::make('photo_path')
                    ->maxLength(255),
                Forms\Components\TextInput::make('baby_movement_frequency'),
                Forms\Components\TextInput::make('baby_movement_time'),
                Forms\Components\TextInput::make('movement_counter')
                    ->numeric(),
                Forms\Components\TextInput::make('breast_condition'),
                Forms\Components\TextInput::make('wound_condition'),
                Forms\Components\TextInput::make('lochia_color'),
                Forms\Components\TextInput::make('lochia_amount'),
                Forms\Components\TextInput::make('lochia_smell'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('kehamilan_id')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('notes_date')
                    ->date()
                    ->sortable(),
                Tables\Columns\TextColumn::make('notes_time'),
                Tables\Columns\TextColumn::make('mood'),
                Tables\Columns\TextColumn::make('stress_level'),
                Tables\Columns\TextColumn::make('stress_cause'),
                Tables\Columns\TextColumn::make('weight')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('additional_notes')
                    ->searchable(),
                Tables\Columns\TextColumn::make('photo_path')
                    ->searchable(),
                Tables\Columns\TextColumn::make('baby_movement_frequency'),
                Tables\Columns\TextColumn::make('baby_movement_time'),
                Tables\Columns\TextColumn::make('movement_counter')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('breast_condition'),
                Tables\Columns\TextColumn::make('wound_condition'),
                Tables\Columns\TextColumn::make('lochia_color'),
                Tables\Columns\TextColumn::make('lochia_amount'),
                Tables\Columns\TextColumn::make('lochia_smell'),
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
            'index' => Pages\ListNotes::route('/'),
            'create' => Pages\CreateNotes::route('/create'),
            'edit' => Pages\EditNotes::route('/{record}/edit'),
        ];
    }
}
