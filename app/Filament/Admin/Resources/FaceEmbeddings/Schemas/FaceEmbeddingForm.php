<?php

namespace App\Filament\Admin\Resources\FaceEmbeddings\Schemas;

use App\Models\StudentAccount;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Components\Utilities\Get;
use Filament\Schemas\Schema;
use Illuminate\Database\Eloquent\Collection;

class FaceEmbeddingForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('id')
                    ->label('Student ID')
                    ->searchable()
                    ->getSearchResultsUsing(fn(string $search): array => 
                        StudentAccount::where('student_id', 'like', "%{$search}%")
                            ->limit(50)
                            ->pluck('student_id', 'student_id')
                            ->toArray()
                    )
                    ->getOptionLabelUsing(fn($value): ?string => 
                        StudentAccount::where('student_id', $value)->value('student_id')
                    )
                    ->required()
                    ->live()
                    ->helperText('Search for a student by ID'),
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
