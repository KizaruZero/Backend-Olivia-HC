<?php

namespace App\Filament\Resources;

use App\Filament\Resources\FaseNifasResource\Pages;
use App\Filament\Resources\FaseNifasResource\RelationManagers;
use App\Models\FaseNifas;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Facades\Storage;
class FaseNifasResource extends Resource
{
    protected static ?string $model = FaseNifas::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('name')
                    ->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('start_day')
                    ->required()
                    ->numeric(),
                Forms\Components\TextInput::make('end_day')
                    ->required()
                    ->numeric(),
                Forms\Components\Textarea::make('description')
                    ->columnSpanFull()
                    ->rows(3),
                Forms\Components\FileUpload::make('twibbon_image')
                    ->disk('public')
                    ->directory('twibbon')
                    ->image(),
                Forms\Components\TextInput::make('video_url')
                    ->maxLength(255),
                Forms\Components\TextInput::make('leaflet_url')
                    ->maxLength(255),
                Forms\Components\TextInput::make('article_url')
                    ->maxLength(255),
                Forms\Components\TextInput::make('border_style')
                    ->maxLength(255),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->searchable(),
                Tables\Columns\TextColumn::make('start_day')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('end_day')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('description')
                    ->limit(50)
                    ->searchable(),
                Tables\Columns\ImageColumn::make('twibbon_image')
                    ->url(fn(FaseNifas $record) => Storage::url($record->twibbon_image)),
                Tables\Columns\TextColumn::make('video_url')
                    ->searchable(),
                Tables\Columns\TextColumn::make('leaflet_url')
                    ->searchable(),
                Tables\Columns\TextColumn::make('article_url')
                    ->searchable(),
                Tables\Columns\TextColumn::make('border_style')
                    ->searchable(),
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
            'index' => Pages\ListFaseNifas::route('/'),
            'create' => Pages\CreateFaseNifas::route('/create'),
            'edit' => Pages\EditFaseNifas::route('/{record}/edit'),
        ];
    }
}
