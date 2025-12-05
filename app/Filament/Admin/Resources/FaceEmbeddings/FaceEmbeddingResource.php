<?php

namespace App\Filament\Admin\Resources\FaceEmbeddings;

use App\Filament\Admin\Resources\FaceEmbeddings\Pages\CreateFaceEmbedding;
use App\Filament\Admin\Resources\FaceEmbeddings\Pages\EditFaceEmbedding;
use App\Filament\Admin\Resources\FaceEmbeddings\Pages\ListFaceEmbeddings;
use App\Filament\Admin\Resources\FaceEmbeddings\Schemas\FaceEmbeddingForm;
use App\Filament\Admin\Resources\FaceEmbeddings\Tables\FaceEmbeddingsTable;
use App\Models\FaceEmbedding;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class FaceEmbeddingResource extends Resource
{
    protected static ?string $model = FaceEmbedding::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $recordTitleAttribute = 'id';

    public static function form(Schema $schema): Schema
    {
        return FaceEmbeddingForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return FaceEmbeddingsTable::configure($table);
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
            'index' => ListFaceEmbeddings::route('/'),
            'create' => CreateFaceEmbedding::route('/create'),
            'edit' => EditFaceEmbedding::route('/{record}/edit'),
        ];
    }
}
