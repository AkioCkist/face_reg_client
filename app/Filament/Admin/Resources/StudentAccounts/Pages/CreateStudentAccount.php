<?php

namespace App\Filament\Admin\Resources\StudentAccounts\Pages;

use App\Filament\Admin\Resources\StudentAccounts\StudentAccountResource;
use Filament\Resources\Pages\CreateRecord;

class CreateStudentAccount extends CreateRecord
{
    protected static string $resource = StudentAccountResource::class;
}
