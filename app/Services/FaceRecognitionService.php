<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Http\Client\Response;
use Exception;

class FaceRecognitionService
{
    private string $fastApiUrl;

    public function __construct()
    {
        $this->fastApiUrl = config('services.face_recognition.url', 'http://localhost:8000');
    }

    /**
     * Recognize face from base64 image
     * 
     * @param string $imageBase64
     * @param int|null $classId Optional class context
     * @return array
     * @throws Exception
     */
    public function recognize(string $imageBase64, ?int $classId = null): array
    {
        try {
            $response = Http::timeout(30)
                ->post("{$this->fastApiUrl}/api/recognize", [
                    'image' => $imageBase64,
                    'class_id' => $classId,
                ]);

            if (!$response->successful()) {
                throw new Exception('Face recognition failed: ' . $response->body());
            }

            return $response->json();
        } catch (Exception $e) {
            \Log::error('Face recognition error', [
                'error' => $e->getMessage(),
                'class_id' => $classId,
            ]);
            throw $e;
        }
    }

    /**
     * Register face embedding for a student
     * 
     * @param int $studentId
     * @param string $imageBase64
     * @return array
     * @throws Exception
     */
    public function registerFace(int $studentId, string $imageBase64): array
    {
        try {
            $response = Http::timeout(30)
                ->post("{$this->fastApiUrl}/api/register-face", [
                    'student_id' => $studentId,
                    'image' => $imageBase64,
                ]);

            if (!$response->successful()) {
                throw new Exception('Face registration failed: ' . $response->body());
            }

            return $response->json();
        } catch (Exception $e) {
            \Log::error('Face registration error', [
                'error' => $e->getMessage(),
                'student_id' => $studentId,
            ]);
            throw $e;
        }
    }

    /**
     * Health check for FastAPI service
     */
    public function healthCheck(): bool
    {
        try {
            $response = Http::timeout(5)
                ->get("{$this->fastApiUrl}/health");

            return $response->successful();
        } catch (Exception $e) {
            \Log::warning('Face recognition service health check failed', [
                'error' => $e->getMessage(),
            ]);
            return false;
        }
    }
}
