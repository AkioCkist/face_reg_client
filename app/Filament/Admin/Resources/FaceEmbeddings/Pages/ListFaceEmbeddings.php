<?php

namespace App\Filament\Admin\Resources\FaceEmbeddings\Pages;

use App\Filament\Admin\Resources\FaceEmbeddings\FaceEmbeddingResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListFaceEmbeddings extends ListRecords
{
    protected static string $resource = FaceEmbeddingResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
