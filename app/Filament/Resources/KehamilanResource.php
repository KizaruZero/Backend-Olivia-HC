<?php

namespace App\Filament\Resources;

use App\Filament\Resources\KehamilanResource\Pages;
use App\Filament\Resources\KehamilanResource\RelationManagers;
use App\Models\Kehamilan;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Carbon;

class KehamilanResource extends Resource
{
    protected static ?string $model = Kehamilan::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('user_id')
                    ->relationship('user', 'name')
                    ->required(),
                Forms\Components\DatePicker::make('last_periode_date')
                    ->required()
                    ->reactive()
                    ->afterStateUpdated(function (callable $set, $state) {
                        if ($state) {
                            $set('estimated_due_date', Carbon::parse($state)->addWeeks(40)->format('Y-m-d'));
                        }
                    }),
                Forms\Components\DatePicker::make('estimated_due_date')
                    ->required()
                    ->reactive()
                    ->afterStateUpdated(function (callable $set, $state, $get) {
                        $lastPeriodeDate = $get('last_periode_date');
                        if ($lastPeriodeDate) {
                            $set('estimated_due_date', Carbon::parse($lastPeriodeDate)->addWeeks(40)->format('Y-m-d'));
                        }
                    }),
                Forms\Components\Toggle::make('is_active')
                    ->required(),
                Forms\Components\Select::make('status')
                    ->options([
                        'hamil' => 'Hamil',
                        'melahirkan' => 'Melahirkan',
                        'keguguran' => 'Keguguran',
                        'nifas' => 'Nifas',
                        'selesai' => 'Selesai',
                    ])
                    ->required(),
                Forms\Components\DatePicker::make('delivered_date'),
                Forms\Components\TextInput::make('miscarriage_week')
                    ->nullable()
                    ->maxLength(255),
                Forms\Components\Toggle::make('is_nifas_complete')
                    ->required(),
                Forms\Components\Textarea::make('notes')
                    ->nullable()
                    ->columnSpanFull(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('user_id')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('last_periode_date')
                    ->date()
                    ->sortable(),
                Tables\Columns\TextColumn::make('estimated_due_date')
                    ->date()
                    ->sortable(),
                Tables\Columns\IconColumn::make('is_active')
                    ->boolean(),
                Tables\Columns\TextColumn::make('status'),
                Tables\Columns\TextColumn::make('delivered_date')
                    ->date()
                    ->sortable(),
                Tables\Columns\TextColumn::make('miscarriage_week')
                    ->searchable(),
                Tables\Columns\IconColumn::make('is_nifas_complete')
                    ->boolean(),
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
            'index' => Pages\ListKehamilans::route('/'),
            'create' => Pages\CreateKehamilan::route('/create'),
            'edit' => Pages\EditKehamilan::route('/{record}/edit'),
        ];
    }
}
