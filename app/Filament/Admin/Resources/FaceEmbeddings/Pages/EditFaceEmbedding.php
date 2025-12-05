<?php

namespace App\Filament\Admin\Resources\FaceEmbeddings\Pages;

use App\Filament\Admin\Resources\FaceEmbeddings\FaceEmbeddingResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditFaceEmbedding extends EditRecord
{
    protected static string $resource = FaceEmbeddingResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
