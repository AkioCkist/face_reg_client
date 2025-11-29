<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Helpers\ResponseHelper;
use App\Services\FaceRecognition\FaceService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;
use Inertia\Response;

class FaceController extends Controller
{
    private FaceService $faceService;

    public function __construct(FaceService $faceService)
    {
        $this->faceService = $faceService;
    }

    /**
     * Display list of all faces
     */
    public function index(Request $request): Response
    {
        $filters = $request->only(['search', 'page', 'per_page']);
        $facesResponse = $this->faceService->listFaces($filters);

        return Inertia::render('Admin/Faces/Index', [
            'faces' => $facesResponse['data'] ?? [],
            'success' => $facesResponse['success'],
            'error' => $facesResponse['error'] ?? null,
        ]);
    }

    /**
     * Show face registration form
     */
    public function create(): Response
    {
        $users = \App\Models\User::select('id', 'name', 'email')
            ->whereDoesntHave('face')
            ->get();

        return Inertia::render('Admin/Faces/Register', [
            'users' => $users,
        ]);
    }

    /**
     * Store a new face
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'image' => 'required|string',
            'name' => 'nullable|string|max:255',
        ]);

        $result = $this->faceService->registerFace($validated);

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
     * Show face edit form
     */
    public function edit(string $id): Response
    {
        $faceResponse = $this->faceService->getFace($id);

        if (!$faceResponse['success']) {
            abort(404, 'Face not found');
        }

        return Inertia::render('Admin/Faces/Edit', [
            'face' => $faceResponse['data'],
        ]);
    }

    /**
     * Update a face
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'nullable|string|max:255',
            'image' => 'nullable|string',
        ]);

        $result = $this->faceService->updateFace($id, $validated);

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
     * Delete a face
     */
    public function destroy(string $id): JsonResponse
    {
        $result = $this->faceService->deleteFace($id);

        if ($result['success']) {
            return ResponseHelper::success(
                null,
                'Face deleted successfully'
            );
        }

        return ResponseHelper::error(
            $result['error'] ?? 'Failed to delete face'
        );
    }

    /**
     * Search faces
     */
    public function search(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'query' => 'required|string|min:1',
        ]);

        $result = $this->faceService->searchFaces($validated['query']);

        if ($result['success']) {
            return ResponseHelper::success($result['data']);
        }

        return ResponseHelper::error(
            $result['error'] ?? 'Search failed'
        );
    }
}
