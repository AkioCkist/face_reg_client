<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Helpers\ResponseHelper;
use App\Helpers\ImageHelper;
use App\Models\FaceEmbedding;
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

        // Extract the faces array from the response
        // FastAPI returns: {success: true, data: {faces: [...], total_count: 194}}
        // or {success: true, faces: [...], total_count: 194}
        $faces = [];
        if ($facesResponse['success']) {
            if (isset($facesResponse['data']['faces'])) {
                $faces = $facesResponse['data']['faces'];
            } elseif (isset($facesResponse['data']) && is_array($facesResponse['data'])) {
                $faces = $facesResponse['data'];
            } elseif (isset($facesResponse['faces'])) {
                $faces = $facesResponse['faces'];
            }
        }

        return Inertia::render('Admin/Faces/Index', [
            'faces' => $faces,
            'success' => $facesResponse['success'],
            'error' => $facesResponse['error'] ?? null,
        ]);
    }

    /**
     * Show face registration form
     */
    public function create(): Response
    {
        // Get all active student accounts for face registration
        $students = \App\Models\StudentAccount::select('id', 'student_id', 'name', 'email', 'department')
            ->active()
            ->orderBy('student_id')
            ->get();

        return Inertia::render('Admin/Faces/Register', [
            'students' => $students,
        ]);
    }

    /**
     * Store a new face
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'student_id' => 'required|integer|exists:student_accounts,student_id',
                'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:10240', // max 10MB
            ]);

            // Get the student account
            $student = \App\Models\StudentAccount::where('student_id', $validated['student_id'])->first();

            if (!$student) {
                return ResponseHelper::error('Student account not found', 404);
            }

            // Convert uploaded image to base64
            $imageFile = $request->file('image');
            $imageData = file_get_contents($imageFile->getRealPath());
            $mimeType = $imageFile->getMimeType();
            $imageBase64 = 'data:' . $mimeType . ';base64,' . base64_encode($imageData);

            // Register face via FastAPI
            $faceData = [
                'account_id' => (string) $validated['student_id'],
                'image_base64' => $imageBase64,
                'use_webcam' => false,
                'override' => false,
            ];

            $result = $this->faceService->registerFace($faceData);

            if ($result['success']) {
                // Get embedding from response
                $embedding = $result['data']['embedding'] ?? null;

                // Store in face_embeddings table with student_id as the ID
                if ($embedding) {
                    FaceEmbedding::updateOrCreate(
                        ['id' => (string) $validated['student_id']],
                        [
                            'embedding' => $embedding,
                        ]
                    );
                }

                return ResponseHelper::created(
                    $result['data'],
                    'Face registered successfully'
                );
            }

            return ResponseHelper::error(
                $result['error'] ?? 'Failed to register face'
            );
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('Face registration error', [
                'error' => $e->getMessage(),
            ]);
            return response()->json([
                'success' => false,
                'message' => 'An error occurred: ' . $e->getMessage(),
            ], 500);
        }
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

    /**
     * Search student accounts
     */
    public function searchStudents(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'query' => 'required|string|min:1',
        ]);

        $students = \App\Models\StudentAccount::select('id', 'student_id', 'name', 'email', 'department')
            ->active()
            ->search($validated['query'])
            ->orderBy('student_id')
            ->limit(20)
            ->get();

        return ResponseHelper::success($students);
    }
}
