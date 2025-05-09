<?php

namespace App\Filament\Resources;

use App\Filament\Resources\UserStatsResource\Pages;
use App\Filament\Resources\UserStatsResource\RelationManagers;
use App\Models\UserStats;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class UserStatsResource extends Resource
{
    protected static ?string $model = UserStats::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('user_id')
                    ->relationship('user', 'name')
                    ->required(),
                Forms\Components\TextInput::make('completed_tasks_count')
                    ->required()
                    ->numeric()
                    ->default(0),
                Forms\Components\TextInput::make('completed_kf_count')
                    ->required()
                    ->numeric()
                    ->default(0),
                Forms\Components\TextInput::make('total_points')
                    ->required()
                    ->numeric()
                    ->default(0),
                Forms\Components\TextInput::make('streak_days')
                    ->required()
                    ->numeric()
                    ->default(0),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('user.name')
                    ->sortable(),
                Tables\Columns\TextColumn::make('completed_tasks_count')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('completed_kf_count')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('total_points')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('streak_days')
                    ->numeric()
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
            'index' => Pages\ListUserStats::route('/'),
            'create' => Pages\CreateUserStats::route('/create'),
            'edit' => Pages\EditUserStats::route('/{record}/edit'),
        ];
    }
}
