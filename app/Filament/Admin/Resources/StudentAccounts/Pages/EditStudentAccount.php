<?php

namespace App\Filament\Admin\Resources\StudentAccounts\Pages;

use App\Filament\Admin\Resources\StudentAccounts\StudentAccountResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditStudentAccount extends EditRecord
{
    protected static string $resource = StudentAccountResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
