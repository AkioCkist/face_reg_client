<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Helpers\ResponseHelper;
use App\Services\FaceRecognition\FaceService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    private FaceService $faceService;

    public function __construct(FaceService $faceService)
    {
        $this->faceService = $faceService;
    }

    /**
     * Display student profile
     */
    public function show(Request $request): Response
    {
        $user = $request->user();

        // Get student's face data if exists
        $faceResponse = $this->faceService->listFaces([
            'user_id' => $user->id,
        ]);

        $hasFace = $faceResponse['success'] && !empty($faceResponse['data']);

        return Inertia::render('Student/Profile', [
            'user' => $user,
            'has_face' => $hasFace,
            'face_data' => $hasFace ? $faceResponse['data'][0] : null,
        ]);
    }

    /**
     * Register student's face
     */
    public function registerFace(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'image' => 'required|string',
        ]);

        $user = $request->user();

        $result = $this->faceService->registerFace([
            'user_id' => $user->id,
            'name' => $user->name,
            'image' => $validated['image'],
        ]);

        if ($result['success']) {
            return ResponseHelper::created(
                $result['data'],
                'Face registered successfully'
            );
        }

        return ResponseHelper::error(
            $result['error'] ?? 'Failed to register face'
        );
    }

    /**
     * Update student's face
     */
    public function updateFace(Request $request, string $faceId): JsonResponse
    {
        $validated = $request->validate([
            'image' => 'required|string',
        ]);

        $result = $this->faceService->updateFace($faceId, [
            'image' => $validated['image'],
        ]);

        if ($result['success']) {
            return ResponseHelper::success(
                $result['data'],
                'Face updated successfully'
            );
        }

        return ResponseHelper::error(
            $result['error'] ?? 'Failed to update face'
        );
    }

    /**
     * Update student profile
     */
    public function update(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:users,email,' . $request->user()->id,
        ]);

        $request->user()->update($validated);

        return ResponseHelper::success(
            $request->user(),
            'Profile updated successfully'
        );
    }
}
