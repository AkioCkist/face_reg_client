<?php

namespace App\Services\FaceRecognition;

use App\Helpers\ImageHelper;
use Illuminate\Support\Facades\Log;

class FaceService
{
    private FastApiClient $apiClient;

    public function __construct(FastApiClient $apiClient)
    {
        $this->apiClient = $apiClient;
    }

    /**
     * Register a new face
     */
    public function registerFace(array $data): array
    {
        try {
            $endpoint = config('api.fastapi.endpoints.faces.register');

            // Validate required fields
            if (empty($data['user_id']) || empty($data['image'])) {
                return [
                    'success' => false,
                    'error' => 'User ID and image are required',
                ];
            }

            // Validate base64 image
            $validationErrors = ImageHelper::validateBase64Image($data['image']);
            if (!empty($validationErrors)) {
                return [
                    'success' => false,
                    'error' => implode(', ', $validationErrors),
                ];
            }

            $payload = [
                'account_id' => (string) $data['user_id'],
                'image_base64' => $data['image'],
                'use_webcam' => false,
                'override' => $data['override'] ?? false,
            ];

            $response = $this->apiClient->post($endpoint, $payload);

            if ($response['success']) {
                Log::info('Face registered successfully', [
                    'user_id' => $data['user_id'],
                ]);
            }

            return $response;
        } catch (\Exception $e) {
            Log::error('Face registration failed', [
                'error' => $e->getMessage(),
                'user_id' => $data['user_id'] ?? null,
            ]);

            return [
                'success' => false,
                'error' => 'Failed to register face: ' . $e->getMessage(),
            ];
        }
    }

    /**
     * Get all registered faces
     */
    public function listFaces(array $filters = []): array
    {
        try {
            $endpoint = config('api.fastapi.endpoints.faces.list');
            $response = $this->apiClient->get($endpoint, $filters);

            return $response;
        } catch (\Exception $e) {
            Log::error('Failed to list faces', [
                'error' => $e->getMessage(),
            ]);

            return [
                'success' => false,
                'error' => 'Failed to retrieve faces: ' . $e->getMessage(),
            ];
        }
    }

    /**
     * Get a specific face by ID
     */
    public function getFace(string $faceId): array
    {
        try {
            $endpoint = $this->apiClient->buildEndpoint(
                config('api.fastapi.endpoints.faces.get'),
                ['id' => $faceId]
            );

            $response = $this->apiClient->get($endpoint);

            return $response;
        } catch (\Exception $e) {
            Log::error('Failed to get face', [
                'face_id' => $faceId,
                'error' => $e->getMessage(),
            ]);

            return [
                'success' => false,
                'error' => 'Failed to retrieve face: ' . $e->getMessage(),
            ];
        }
    }

    /**
     * Update a face
     */
    public function updateFace(string $faceId, array $data): array
    {
        try {
            $endpoint = $this->apiClient->buildEndpoint(
                config('api.fastapi.endpoints.faces.update'),
                ['id' => $faceId]
            );

            // Validate base64 image if provided
            if (!empty($data['image'])) {
                $validationErrors = ImageHelper::validateBase64Image($data['image']);
                if (!empty($validationErrors)) {
                    return [
                        'success' => false,
                        'error' => implode(', ', $validationErrors),
                    ];
                }
            }

            $response = $this->apiClient->put($endpoint, $data);

            if ($response['success']) {
                Log::info('Face updated successfully', [
                    'face_id' => $faceId,
                ]);
            }

            return $response;
        } catch (\Exception $e) {
            Log::error('Face update failed', [
                'face_id' => $faceId,
                'error' => $e->getMessage(),
            ]);

            return [
                'success' => false,
                'error' => 'Failed to update face: ' . $e->getMessage(),
            ];
        }
    }

    /**
     * Delete a face
     */
    public function deleteFace(string $faceId): array
    {
        try {
            $endpoint = $this->apiClient->buildEndpoint(
                config('api.fastapi.endpoints.faces.delete'),
                ['id' => $faceId]
            );

            $response = $this->apiClient->delete($endpoint);

            if ($response['success']) {
                Log::info('Face deleted successfully', [
                    'face_id' => $faceId,
                ]);
            }

            return $response;
        } catch (\Exception $e) {
            Log::error('Face deletion failed', [
                'face_id' => $faceId,
                'error' => $e->getMessage(),
            ]);

            return [
                'success' => false,
                'error' => 'Failed to delete face: ' . $e->getMessage(),
            ];
        }
    }

    /**
     * Search faces
     */
    public function searchFaces(string $query): array
    {
        try {
            $endpoint = config('api.fastapi.endpoints.faces.search');
            $response = $this->apiClient->get($endpoint, ['q' => $query]);

            return $response;
        } catch (\Exception $e) {
            Log::error('Face search failed', [
                'query' => $query,
                'error' => $e->getMessage(),
            ]);

            return [
                'success' => false,
                'error' => 'Failed to search faces: ' . $e->getMessage(),
            ];
        }
    }

    /**
     * Get all registered faces
     * Used for admin student management to show face registration status
     */
    public function getAllFaces(): array
    {
        try {
            $endpoint = config('api.fastapi.endpoints.faces.list');
            $response = $this->apiClient->get($endpoint);

            if ($response['success'] && isset($response['data'])) {
                return [
                    'success' => true,
                    'data' => $response['data'],
                ];
            }

            return [
                'success' => false,
                'data' => [],
            ];
        } catch (\Exception $e) {
            Log::error('Failed to get all faces', [
                'error' => $e->getMessage(),
            ]);

            return [
                'success' => false,
                'data' => [],
                'error' => $e->getMessage(),
            ];
        }
    }

    /**
     * Remove face by user ID
     * Deletes face data associated with a specific user
     */
    public function removeFaceByUserId(string $userId): array
    {
        try {
            $endpoint = $this->apiClient->buildEndpoint(
                config('api.fastapi.endpoints.faces.delete_by_user'),
                ['user_id' => $userId]
            );

            $response = $this->apiClient->delete($endpoint);

            if ($response['success']) {
                Log::info('Face removed successfully for user', [
                    'user_id' => $userId,
                ]);
            }

            return $response;
        } catch (\Exception $e) {
            Log::error('Face removal failed', [
                'user_id' => $userId,
                'error' => $e->getMessage(),
            ]);

            return [
                'success' => false,
                'error' => 'Failed to remove face: ' . $e->getMessage(),
            ];
        }
    }

    /**
     * Get faces for multiple user IDs
     * Returns a mapping of user_id => face_data
     */
    public function getFacesByUserIds(array $userIds): array
    {
        try {
            $allFaces = $this->getAllFaces();

            if (!$allFaces['success']) {
                return [];
            }

            $faceMap = [];
            foreach ($allFaces['data'] as $face) {
                $faceUserId = $face['user_id'] ?? $face['account_id'] ?? null;

                if ($faceUserId && in_array($faceUserId, $userIds)) {
                    $faceMap[$faceUserId] = [
                        'face_id' => $face['id'] ?? $face['face_id'] ?? null,
                        'registered_at' => $face['created_at'] ?? $face['registered_at'] ?? null,
                        'metadata' => $face['metadata'] ?? [],
                    ];
                }
            }

            return $faceMap;
        } catch (\Exception $e) {
            Log::error('Failed to get faces by user IDs', [
                'error' => $e->getMessage(),
            ]);

            return [];
        }
    }
}
