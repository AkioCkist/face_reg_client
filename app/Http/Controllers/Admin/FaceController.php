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
            // Log raw request data
            \Illuminate\Support\Facades\Log::info('Face register request received', [
                'content_type' => $request->header('Content-Type'),
                'content_length' => $request->header('Content-Length'),
                'method' => $request->method(),
                'all_keys' => array_keys($request->all()),
                'has_student_id' => $request->has('student_id'),
                'has_image' => $request->has('image'),
                'student_id_value' => substr($request->get('student_id', ''), 0, 50),
                'image_length' => strlen($request->get('image', '')),
            ]);

            $validated = $request->validate([
                'student_id' => 'required|integer|exists:student_accounts,student_id',
                'image' => 'required|string',
            ]);

            // Get the student account to get the database ID
            $student = \App\Models\StudentAccount::where('student_id', $validated['student_id'])->first();

            if (!$student) {
                return ResponseHelper::error('Student account not found', 404);
            }

            $faceData = [
                'user_id' => $student->id, // Use the database ID for face service
                'student_id' => $validated['student_id'], // Include student ID in metadata
                'name' => $student->name,
                'image' => $validated['image'],
                'metadata' => [
                    'student_id' => $validated['student_id'],
                    'email' => $student->email,
                    'department' => $student->department,
                ]
            ];

            $result = $this->faceService->registerFace($faceData);

            if ($result['success']) {
                return ResponseHelper::created(
                    $result['data'],
                    'Face registered successfully'
                );
            }

            return ResponseHelper::error(
                $result['error'] ?? 'Failed to register face'
            );
        } catch (\Illuminate\Validation\ValidationException $e) {
            \Illuminate\Support\Facades\Log::error('Validation error in face registration', [
                'errors' => $e->errors(),
                'request_data' => array_keys($request->all()),
            ]);
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('Face registration error', [
                'error' => $e->getMessage(),
                'student_id' => $request->get('student_id'),
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
