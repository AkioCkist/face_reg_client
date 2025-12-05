<?php

namespace App\Filament\Admin\Resources\FaceEmbeddings\Pages;

use App\Filament\Admin\Resources\FaceEmbeddings\FaceEmbeddingResource;
use App\Models\FaceEmbedding;
use App\Models\StudentAccount;
use App\Services\FaceRecognition\FaceService;
use Filament\Resources\Pages\CreateRecord;
use Filament\Notifications\Notification;
use Illuminate\Support\Facades\Log;

class CreateFaceEmbedding extends CreateRecord
{
    protected static string $resource = FaceEmbeddingResource::class;

    public function save(): void
    {
        try {
            $data = $this->form->getState();

            // Validate student exists
            $student = StudentAccount::where('student_id', $data['id'])->first();
            if (!$student) {
                Notification::make()
                    ->danger()
                    ->title('Student Not Found')
                    ->body("Student ID {$data['id']} does not exist in the system.")
                    ->send();
                return;
            }

            // Validate file upload
            if (!isset($data['image']) || empty($data['image'])) {
                Notification::make()
                    ->danger()
                    ->title('File Required')
                    ->body('Please upload an image file.')
                    ->send();
                return;
            }

            // Get the uploaded file
            $uploadedFile = $data['image'];
            
            // Handle if it's an array (from file upload field)
            if (is_array($uploadedFile)) {
                $uploadedFile = reset($uploadedFile);
            }

            // Convert file to base64
            $filePath = storage_path('app/' . $uploadedFile);
            if (!file_exists($filePath)) {
                Notification::make()
                    ->danger()
                    ->title('File Error')
                    ->body('The uploaded file could not be found.')
                    ->send();
                return;
            }

            $imageContent = file_get_contents($filePath);
            $base64Image = 'data:image/jpeg;base64,' . base64_encode($imageContent);

            // Call FastAPI to register face
            $faceService = app(FaceService::class);
            $response = $faceService->registerFace([
                'user_id' => $data['id'],
                'image' => $base64Image,
                'override' => false,
            ]);

            if (!$response['success']) {
                Notification::make()
                    ->danger()
                    ->title('Face Registration Failed')
                    ->body($response['error'] ?? 'Unknown error occurred.')
                    ->send();
                return;
            }

            // Store embedding in database
            $embedding = $response['embedding'] ?? [];
            
            FaceEmbedding::updateOrCreate(
                ['id' => $data['id']],
                ['embedding' => $embedding]
            );

            // Clean up uploaded file
            if (file_exists($filePath)) {
                unlink($filePath);
            }

            Notification::make()
                ->success()
                ->title('Face Registered Successfully')
                ->body("Face embedding for Student ID {$data['id']} has been registered.")
                ->send();

            $this->redirect(static::getResource()::getUrl('index'));
        } catch (\Exception $e) {
            Log::error('Face registration error', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            Notification::make()
                ->danger()
                ->title('Error')
                ->body('An error occurred: ' . $e->getMessage())
                ->send();
        }
    }
}
