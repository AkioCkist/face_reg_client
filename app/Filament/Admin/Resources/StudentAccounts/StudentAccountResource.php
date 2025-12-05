<?php

namespace App\Filament\Admin\Resources\StudentAccounts;

use App\Filament\Admin\Resources\StudentAccounts\Pages\CreateStudentAccount;
use App\Filament\Admin\Resources\StudentAccounts\Pages\EditStudentAccount;
use App\Filament\Admin\Resources\StudentAccounts\Pages\ListStudentAccounts;
use App\Filament\Admin\Resources\StudentAccounts\Schemas\StudentAccountForm;
use App\Filament\Admin\Resources\StudentAccounts\Tables\StudentAccountsTable;
use App\Models\StudentAccount;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class StudentAccountResource extends Resource
{
    protected static ?string $model = StudentAccount::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $recordTitleAttribute = 'name';

    public static function form(Schema $schema): Schema
    {
        return StudentAccountForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return StudentAccountsTable::configure($table);
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
            'index' => ListStudentAccounts::route('/'),
            'create' => CreateStudentAccount::route('/create'),
            'edit' => EditStudentAccount::route('/{record}/edit'),
        ];
    }
}
