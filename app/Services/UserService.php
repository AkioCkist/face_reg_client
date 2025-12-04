<?php

namespace App\Services;

use App\Http\Resources\StudentResource;
use App\Models\User;
use App\Services\FaceRecognition\FaceService;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class UserService
{
    public function __construct(
        private FaceService $faceService
    ) {
    }

    /**
     * Get all users with pagination, search, and filters
     */
    public function getAllUsers(array $filters = [], int $perPage = null): LengthAwarePaginator
    {
        $perPage = $perPage ?? config('constants.pagination.default_per_page');

        $query = User::query();

        // Apply search filter
        if (!empty($filters['search'])) {
            $search = $filters['search'];
            $query->where(function (Builder $q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('student_id', 'like', "%{$search}%");
            });
        }

        // Apply role filter
        if (!empty($filters['role'])) {
            $query->where('role', $filters['role']);
        }

        // Order by created_at descending by default
        $query->orderBy('created_at', 'desc');

        // Paginate results
        $users = $query->paginate($perPage);

        // Enrich with face data
        $users->getCollection()->transform(function ($user) {
            return $this->enrichUserWithFaceData($user);
        });

        return $users;
    }

    /**
     * Create a new user
     */
    public function createUser(array $data): User
    {
        try {
            $userData = [
                'name' => $data['name'],
                'email' => $data['email'],
                'role' => $data['role'],
                'student_id' => $data['student_id'] ?? null,
                'password' => Hash::make($data['password']),
            ];

            $user = User::create($userData);

            Log::info('User created successfully', [
                'user_id' => $user->id,
                'role' => $user->role,
            ]);

            return $user;
        } catch (\Exception $e) {
            Log::error('Failed to create user', [
                'error' => $e->getMessage(),
                'data' => $data,
            ]);

            throw $e;
        }
    }

    /**
     * Update an existing user
     */
    public function updateUser(User $user, array $data): User
    {
        try {
            $updateData = [
                'name' => $data['name'],
                'email' => $data['email'],
                'role' => $data['role'],
                'student_id' => $data['student_id'] ?? null,
            ];

            // Only update password if provided
            if (!empty($data['password'])) {
                $updateData['password'] = Hash::make($data['password']);
            }

            $user->update($updateData);

            Log::info('User updated successfully', [
                'user_id' => $user->id,
            ]);

            return $user->fresh();
        } catch (\Exception $e) {
            Log::error('Failed to update user', [
                'user_id' => $user->id,
                'error' => $e->getMessage(),
            ]);

            throw $e;
        }
    }

    /**
     * Delete a user
     */
    public function deleteUser(User $user): bool
    {
        try {
            $userId = $user->id;

            // Also try to remove face data from FastAPI
            try {
                $this->faceService->removeFaceByUserId((string) $userId);
            } catch (\Exception $e) {
                // Log but don't fail the user deletion if face removal fails
                Log::warning('Failed to remove face data during user deletion', [
                    'user_id' => $userId,
                    'error' => $e->getMessage(),
                ]);
            }

            $user->delete();

            Log::info('User deleted successfully', [
                'user_id' => $userId,
            ]);

            return true;
        } catch (\Exception $e) {
            Log::error('Failed to delete user', [
                'user_id' => $user->id,
                'error' => $e->getMessage(),
            ]);

            throw $e;
        }
    }

    /**
     * Enrich a single user with face data
     */
    private function enrichUserWithFaceData(User $user): User
    {
        $faceData = $this->faceService->getFacesByUserIds([$user->id]);

        if (isset($faceData[$user->id])) {
            $user->has_face = true;
            $user->face_id = $faceData[$user->id]['face_id'];
        } else {
            $user->has_face = false;
            $user->face_id = null;
        }

        return $user;
    }

    /**
     * Enrich multiple users with face data
     */
    public function enrichUsersWithFaceData($users)
    {
        $userIds = $users->pluck('id')->toArray();
        $faceData = $this->faceService->getFacesByUserIds($userIds);

        return $users->map(function ($user) use ($faceData) {
            if (isset($faceData[$user->id])) {
                $user->has_face = true;
                $user->face_id = $faceData[$user->id]['face_id'];
            } else {
                $user->has_face = false;
                $user->face_id = null;
            }

            return $user;
        });
    }

    /**
     * Remove face data for a user
     */
    public function removeFaceData(User $user): array
    {
        try {
            $response = $this->faceService->removeFaceByUserId((string) $user->id);

            if ($response['success']) {
                Log::info('Face data removed for user', [
                    'user_id' => $user->id,
                ]);
            }

            return $response;
        } catch (\Exception $e) {
            Log::error('Failed to remove face data', [
                'user_id' => $user->id,
                'error' => $e->getMessage(),
            ]);

            return [
                'success' => false,
                'error' => $e->getMessage(),
            ];
        }
    }
}
