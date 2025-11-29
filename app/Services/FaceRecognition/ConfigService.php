<?php

namespace App\Services\FaceRecognition;

use Illuminate\Support\Facades\Log;

class ConfigService
{
    private FastApiClient $apiClient;

    public function __construct(FastApiClient $apiClient)
    {
        $this->apiClient = $apiClient;
    }

    /**
     * Get system configuration from FastAPI
     */
    public function getConfig(): array
    {
        try {
            $endpoint = config('api.fastapi.endpoints.config.get');
            $response = $this->apiClient->get($endpoint);

            return $response;
        } catch (\Exception $e) {
            Log::error('Failed to get config', [
                'error' => $e->getMessage(),
            ]);

            return [
                'success' => false,
                'error' => 'Failed to retrieve configuration: ' . $e->getMessage(),
            ];
        }
    }

    /**
     * Update system configuration
     */
    public function updateConfig(array $configData): array
    {
        try {
            $endpoint = config('api.fastapi.endpoints.config.update');

            // Validate configuration data
            $validationErrors = $this->validateConfig($configData);
            if (!empty($validationErrors)) {
                return [
                    'success' => false,
                    'error' => 'Invalid configuration',
                    'errors' => $validationErrors,
                ];
            }

            $response = $this->apiClient->put($endpoint, $configData);

            if ($response['success']) {
                Log::info('Configuration updated successfully', [
                    'config' => $configData,
                ]);
            }

            return $response;
        } catch (\Exception $e) {
            Log::error('Failed to update config', [
                'error' => $e->getMessage(),
            ]);

            return [
                'success' => false,
                'error' => 'Failed to update configuration: ' . $e->getMessage(),
            ];
        }
    }

    /**
     * Validate configuration data
     */
    private function validateConfig(array $configData): array
    {
        $errors = [];

        // Validate confidence threshold
        if (isset($configData['confidence_threshold'])) {
            $threshold = $configData['confidence_threshold'];
            if (!is_numeric($threshold) || $threshold < 0 || $threshold > 1) {
                $errors['confidence_threshold'] = 'Confidence threshold must be between 0 and 1';
            }
        }

        // Validate max faces per image
        if (isset($configData['max_faces_per_image'])) {
            $maxFaces = $configData['max_faces_per_image'];
            if (!is_int($maxFaces) || $maxFaces < 1) {
                $errors['max_faces_per_image'] = 'Max faces per image must be a positive integer';
            }
        }

        return $errors;
    }

    /**
     * Get default configuration
     */
    public function getDefaultConfig(): array
    {
        return [
            'confidence_threshold' => config('constants.face_recognition.min_confidence_threshold'),
            'max_faces_per_image' => config('constants.face_recognition.max_faces_per_image'),
            'image_quality' => config('constants.face_recognition.image_quality'),
            'auto_mark_threshold' => config('constants.attendance.auto_mark_threshold'),
        ];
    }

    /**
     * Check if FastAPI service is healthy
     */
    public function checkServiceHealth(): array
    {
        try {
            $isHealthy = $this->apiClient->checkHealth();

            return [
                'success' => true,
                'data' => [
                    'healthy' => $isHealthy,
                    'timestamp' => now()->toIso8601String(),
                ],
            ];
        } catch (\Exception $e) {
            Log::error('Health check failed', [
                'error' => $e->getMessage(),
            ]);

            return [
                'success' => false,
                'error' => 'Health check failed: ' . $e->getMessage(),
            ];
        }
    }
}
