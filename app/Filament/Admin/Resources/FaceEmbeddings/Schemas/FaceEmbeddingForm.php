<?php

namespace App\Filament\Admin\Resources\FaceEmbeddings\Schemas;

use App\Models\StudentAccount;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Components\Utilities\Get;
use Filament\Schemas\Schema;

class FaceEmbeddingForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('id')
                    ->label('Student ID')
                    ->options(StudentAccount::pluck('student_id', 'student_id')->toArray())
                    ->searchable()
                    ->required()
                    ->live()
                    ->helperText('Select a student to auto-fill the Face ID'),
                TextInput::make('face_id')
                    ->label('Face ID')
                    ->disabled()
                    ->dehydrated(false)
                    ->default(fn(Get $get) => $get('id'))
                    ->helperText('Auto-filled from Student ID'),
                FileUpload::make('image')
                    ->label('Upload Face Image')
                    ->image()
                    ->imageEditor()
                    ->maxSize(10240)
                    ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/gif'])
                    ->required()
                    ->storeFiles(false)
                    ->helperText('Upload JPEG, PNG, or GIF image (max 10MB)'),
                Textarea::make('embedding')
                    ->disabled()
                    ->rows(10)
                    ->label('Face Embedding Vector')
                    ->helperText('This is the face embedding vector stored in the database after processing'),
            ]);
    }
}
