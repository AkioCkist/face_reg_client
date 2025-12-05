<?php

namespace App\Filament\Admin\Resources\StudentAccounts\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class StudentAccountForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('student_id')
                    ->numeric()
                    ->required()
                    ->unique(ignoreRecord: true),
                TextInput::make('name')
                    ->required()
                    ->maxLength(255),
                TextInput::make('email')
                    ->email()
                    ->required()
                    ->maxLength(255),
                TextInput::make('phone')
                    ->tel()
                    ->maxLength(20),
                TextInput::make('department')
                    ->maxLength(255),
                TextInput::make('academic_year')
                    ->numeric()
                    ->minValue(1)
                    ->maxValue(4),
                Toggle::make('is_active')
                    ->default(true),
            ]);
    }
}
