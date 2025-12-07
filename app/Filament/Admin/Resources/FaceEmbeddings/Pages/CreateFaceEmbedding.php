<?php

namespace App\Filament\Admin\Resources\FaceEmbeddings\Pages;

use App\Filament\Admin\Resources\FaceEmbeddings\FaceEmbeddingResource;
use App\Models\FaceEmbedding;
use App\Models\StudentAccount;
use App\Services\FaceRecognition\FaceService;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Support\Facades\Log;

class CreateFaceEmbedding extends CreateRecord
{
    protected static string $resource = FaceEmbeddingResource::class;

    protected function handleRecordCreation(array $data): FaceEmbedding
    {
        Log::info('Face registration form submitted', [
            'student_id' => $data['id'],
            'has_image' => isset($data['image']),
        ]);

        // Validate student exists
        $student = StudentAccount::where('student_id', $data['id'])->first();
        if (!$student) {
            Log::warning('Student not found', ['student_id' => $data['id']]);
            throw new \Exception("Student ID {$data['id']} does not exist in the system.");
        }

        // Validate file upload
        if (!isset($data['image']) || empty($data['image'])) {
            Log::warning('No image file provided');
            throw new \Exception('Please upload an image file.');
        }

        // Get the uploaded file
        $uploadedFile = $data['image'];
        
        // Handle if it's an array (from file upload field)
        if (is_array($uploadedFile)) {
            $uploadedFile = reset($uploadedFile);
        }

        Log::info('Processing uploaded file', [
            'uploaded_file' => $uploadedFile,
            'uploaded_file_type' => gettype($uploadedFile),
        ]);

        // Get the actual file from Filament's temporary storage
        // Filament stores uploaded files in a temporary location
        $filePath = null;
        
        // Check if it's an UploadedFile object (actual file from upload)
        if ($uploadedFile instanceof \Illuminate\Http\UploadedFile) {
            $filePath = $uploadedFile->getRealPath();
            Log::info('Found UploadedFile object', ['real_path' => $filePath]);
        } else {
            // It might be a string path or temporary path
            $potentialPaths = [
                $uploadedFile,
                storage_path('app/' . $uploadedFile),
                storage_path('app/livewire-tmp/' . $uploadedFile),
                sys_get_temp_dir() . DIRECTORY_SEPARATOR . $uploadedFile,
            ];

            foreach ($potentialPaths as $path) {
                $normalized = str_replace('/', DIRECTORY_SEPARATOR, $path);
                Log::info('Checking potential path', ['path' => $normalized, 'exists' => file_exists($normalized)]);
                if (file_exists($normalized)) {
                    $filePath = $normalized;
                    break;
                }
            }
        }

        Log::info('Final file path determination', [
            'file_path' => $filePath,
            'file_exists' => $filePath ? file_exists($filePath) : false,
        ]);

        if (!$filePath || !file_exists($filePath)) {
            Log::error('Uploaded file not found in any location', [
                'original_uploaded_file' => $uploadedFile,
                'checked_paths' => $potentialPaths ?? [],
            ]);
            throw new \Exception('The uploaded file could not be found.');
        }

        $imageContent = file_get_contents($filePath);
        $base64Image = 'data:image/jpeg;base64,' . base64_encode($imageContent);

        Log::info('Image converted to base64', [
            'file_size' => strlen($imageContent),
            'base64_size' => strlen($base64Image),
        ]);

        // Call FastAPI to register face
        $faceService = app(FaceService::class);
        
        Log::info('Calling FaceService::registerFace', [
            'student_id' => $data['id'],
        ]);
        
        $response = $faceService->registerFace([
            'user_id' => $data['id'],
            'image' => $base64Image,
            'override' => false,
        ]);

        if (!$response['success']) {
            Log::error('FastAPI registration failed', [
                'student_id' => $data['id'],
                'error' => $response['error'] ?? 'Unknown error',
            ]);
            throw new \Exception($response['error'] ?? 'Face registration failed.');
        }

        // Clean up uploaded file
        if (file_exists($filePath)) {
            unlink($filePath);
            Log::info('Cleaned up temporary file', ['path' => $filePath]);
        }

        Log::info('Face registration completed successfully', [
            'student_id' => $data['id'],
        ]);

        // Redirect to the face embeddings list page
        $this->redirect('/admin/face-embeddings');
        
        // Return null since we're redirecting instead of creating a record
        return null;
    }
}
