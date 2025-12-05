<?php

namespace App\Filament\Admin\Resources\StudentAccounts\Pages;

use App\Filament\Admin\Resources\StudentAccounts\StudentAccountResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListStudentAccounts extends ListRecords
{
    protected static string $resource = StudentAccountResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
