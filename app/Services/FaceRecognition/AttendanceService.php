<?php

namespace App\Services\FaceRecognition;

use App\Helpers\ImageHelper;
use Illuminate\Support\Facades\Log;

class AttendanceService
{
    private FastApiClient $apiClient;

    public function __construct(FastApiClient $apiClient)
    {
        $this->apiClient = $apiClient;
    }

    /**
     * Recognize face for attendance
     */
    public function recognizeFace(string $image): array
    {
        try {
            // Validate base64 image
            $validationErrors = ImageHelper::validateBase64Image($image);
            if (!empty($validationErrors)) {
                return [
                    'success' => false,
                    'error' => implode(', ', $validationErrors),
                ];
            }

            $endpoint = config('api.fastapi.endpoints.recognition.recognize');

            $payload = [
                'image' => $image,
                'threshold' => config('constants.face_recognition.min_confidence_threshold'),
            ];

            $response = $this->apiClient->post($endpoint, $payload);

            if ($response['success']) {
                Log::info('Face recognition completed', [
                    'recognized' => $response['data']['recognized'] ?? false,
                    'confidence' => $response['data']['confidence'] ?? 0,
                ]);
            }

            return $response;
        } catch (\Exception $e) {
            Log::error('Face recognition failed', [
                'error' => $e->getMessage(),
            ]);

            return [
                'success' => false,
                'error' => 'Failed to recognize face: ' . $e->getMessage(),
            ];
        }
    }

    /**
     * Verify face against a specific user
     */
    public function verifyFace(string $image, string $userId): array
    {
        try {
            // Validate base64 image
            $validationErrors = ImageHelper::validateBase64Image($image);
            if (!empty($validationErrors)) {
                return [
                    'success' => false,
                    'error' => implode(', ', $validationErrors),
                ];
            }

            $endpoint = config('api.fastapi.endpoints.recognition.verify');

            $payload = [
                'image' => $image,
                'user_id' => $userId,
                'threshold' => config('constants.face_recognition.min_confidence_threshold'),
            ];

            $response = $this->apiClient->post($endpoint, $payload);

            if ($response['success']) {
                Log::info('Face verification completed', [
                    'user_id' => $userId,
                    'verified' => $response['data']['verified'] ?? false,
                    'confidence' => $response['data']['confidence'] ?? 0,
                ]);
            }

            return $response;
        } catch (\Exception $e) {
            Log::error('Face verification failed', [
                'user_id' => $userId,
                'error' => $e->getMessage(),
            ]);

            return [
                'success' => false,
                'error' => 'Failed to verify face: ' . $e->getMessage(),
            ];
        }
    }

    /**
     * Process attendance based on recognition result
     */
    public function processAttendance(array $recognitionData, array $sessionData): array
    {
        try {
            if (!isset($recognitionData['user_id'])) {
                return [
                    'success' => false,
                    'error' => 'No user identified in recognition data',
                ];
            }

            $confidence = $recognitionData['confidence'] ?? 0;
            $autoMarkThreshold = config('constants.attendance.auto_mark_threshold');

            // Determine attendance status based on confidence
            $status = $confidence >= $autoMarkThreshold ? 'present' : 'pending';

            $attendanceRecord = [
                'user_id' => $recognitionData['user_id'],
                'session_id' => $sessionData['session_id'] ?? null,
                'status' => $status,
                'confidence' => $confidence,
                'timestamp' => now()->toIso8601String(),
                'metadata' => [
                    'recognition_data' => $recognitionData,
                    'session_data' => $sessionData,
                ],
            ];

            Log::info('Attendance processed', [
                'user_id' => $recognitionData['user_id'],
                'status' => $status,
                'confidence' => $confidence,
            ]);

            return [
                'success' => true,
                'data' => $attendanceRecord,
            ];
        } catch (\Exception $e) {
            Log::error('Attendance processing failed', [
                'error' => $e->getMessage(),
            ]);

            return [
                'success' => false,
                'error' => 'Failed to process attendance: ' . $e->getMessage(),
            ];
        }
    }

    /**
     * Get attendance statistics
     */
    public function getAttendanceStats(array $filters = []): array
    {
        try {
            // This would typically query your local database
            // For now, returning a placeholder structure
            return [
                'success' => true,
                'data' => [
                    'total_sessions' => 0,
                    'total_attendances' => 0,
                    'present_count' => 0,
                    'absent_count' => 0,
                    'late_count' => 0,
                    'attendance_rate' => 0,
                ],
            ];
        } catch (\Exception $e) {
            Log::error('Failed to get attendance stats', [
                'error' => $e->getMessage(),
            ]);

            return [
                'success' => false,
                'error' => 'Failed to retrieve statistics: ' . $e->getMessage(),
            ];
        }
    }
}
