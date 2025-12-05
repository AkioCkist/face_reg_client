<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Services\FaceRecognition\FaceService;

/**
 * Face Model
 * 
 * This model represents face embeddings stored in the FastAPI backend.
 * It syncs with FastAPI and stores local copies in the database.
 */
class Face extends Model
{
    protected $fillable = [
        'face_id',
        'user_id',
        'student_id',
        'name',
        'embedding',
        'metadata',
    ];

    protected $casts = [
        'embedding' => 'array',
        'metadata' => 'array',
    ];

    /**
     * Get the route key for the model.
     */
    public function getRouteKeyName(): string
    {
        return 'face_id';
    }

    /**
     * Get the student account for this face
     */
    public function student()
    {
        return $this->belongsTo(StudentAccount::class, 'student_id', 'student_id');
    }

    /**
     * Sync faces from FastAPI to local database
     */
    public static function syncFromFastAPI(): array
    {
        try {
            $faceService = app(FaceService::class);
            $response = $faceService->listFaces();

            if (!$response['success']) {
                return ['success' => false, 'error' => $response['error'] ?? 'Failed to sync faces'];
            }

            // Extract faces array from response
            $faces = [];
            if (isset($response['data']['faces'])) {
                $faces = $response['data']['faces'];
            } elseif (isset($response['data']) && is_array($response['data'])) {
                $faces = $response['data'];
            } elseif (isset($response['faces'])) {
                $faces = $response['faces'];
            }

            // Sync each face to the database
            $synced = 0;
            foreach ($faces as $faceData) {
                // Handle various ID field names from FastAPI
                $faceId = $faceData['id'] ?? $faceData['face_id'] ?? $faceData['account_id'] ?? null;
                $studentId = $faceData['student_id'] ?? $faceData['account_id'] ?? null;
                $name = $faceData['name'] ?? 'Unknown';

                // Only create/update if we have at least a student_id or face_id
                if ($studentId || $faceId) {
                    self::updateOrCreate(
                        ['student_id' => $studentId],
                        [
                            'face_id' => $faceId,
                            'name' => $name,
                            'metadata' => is_array($faceData) ? json_encode($faceData) : $faceData,
                        ]
                    );
                    $synced++;
                }
            }

            return ['success' => true, 'synced' => $synced];
        } catch (\Exception $e) {
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }
}
