<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Helpers\ResponseHelper;
use App\Models\ClassModel;
use App\Services\FaceRecognition\AttendanceService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;
use Inertia\Response;

class AttendanceController extends Controller
{
    private AttendanceService $attendanceService;

    public function __construct(AttendanceService $attendanceService)
    {
        $this->attendanceService = $attendanceService;
    }

    /**
     * Display attendance index page for a specific class
     */
    public function index(ClassModel $class): Response
    {
        // Verify teacher owns this class
        if ($class->teacher_id !== auth()->id()) {
            abort(403, 'Unauthorized');
        }

        // Load the students relationship
        $class->load('students');

        return Inertia::render('Teacher/Attendance/Index', [
            'classData' => $class,
            'students' => $class->students()->get(),
            'date' => now()->toDateString(),
        ]);
    }

    /**
     * Display attendance start page
     */
    public function start(): Response
    {
        return Inertia::render('Teacher/Attendance/Index');
    }

    /**
     * Process face recognition for attendance
     */
    public function faceAttendance(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'image' => 'required|string',
            'class_id' => 'required|exists:classes,id',
        ]);

        try {
            // Log the incoming request
            \Log::info('Face attendance request received', [
                'class_id' => $validated['class_id'],
                'image_size' => strlen($validated['image']),
            ]);

            // Call Python face recognition API
            $client = new \GuzzleHttp\Client();
            
            $response = $client->post('http://localhost:3636/api/v1/faces/recognize', [
                'json' => [
                    'image_base64' => $validated['image'],
                    'similarity_threshold' => 0.45,
                    'skip_anti_spoofing' => true,  // Skip anti-spoofing for web-based captures
                ],
                'timeout' => 10,
            ]);

            $result = json_decode($response->getBody()->getContents(), true);

            // Log the API response
            \Log::info('Face recognition API response', [
                'success' => $result['success'] ?? false,
                'recognized' => $result['recognized'] ?? false,
                'anti_spoofing_passed' => $result['anti_spoofing_passed'] ?? false,
                'anti_spoofing_confidence' => $result['anti_spoofing_confidence'] ?? null,
                'message' => $result['message'] ?? 'No message',
            ]);

            if (!$result['success']) {
                return ResponseHelper::error($result['message'] ?? 'Face recognition failed');
            }

            if (!$result['recognized']) {
                $message = $result['message'] ?? 'Face not recognized';
                
                // Provide helpful feedback for anti-spoofing failures
                if (isset($result['anti_spoofing_passed']) && !$result['anti_spoofing_passed']) {
                    $message = 'Please ensure good lighting and look directly at the camera. The system detected this might not be a live person.';
                }
                
                return ResponseHelper::success([
                    'recognized' => false,
                    'message' => $message,
                    'anti_spoofing_passed' => $result['anti_spoofing_passed'] ?? false,
                ]);
            }

            // Face recognized - find the student in student_accounts table
            $accountId = $result['account_id'];
            $studentAccount = \App\Models\StudentAccount::where('student_id', $accountId)->first();

            if (!$studentAccount) {
                return ResponseHelper::success([
                    'recognized' => false,
                    'message' => "Student with ID {$accountId} not found in the system",
                ]);
            }

            // Find the corresponding user account
            $student = \App\Models\User::where('student_id', $accountId)
                ->where('role', 'student')
                ->first();

            if (!$student) {
                return ResponseHelper::success([
                    'recognized' => false,
                    'message' => "User account for student ID {$accountId} not found. Please contact administrator.",
                ]);
            }

            // Return student info without saving to database yet
            // The frontend will collect all students and save in a batch
            return ResponseHelper::success([
                'recognized' => true,
                'student' => [
                    'id' => $student->id,
                    'name' => $studentAccount->name,
                    'student_id' => $studentAccount->student_id,
                    'email' => $studentAccount->email,
                    'department' => $studentAccount->department,
                ],
                'confidence' => $result['confidence'] ?? 0,
                'message' => "Student recognized: {$studentAccount->name}",
            ]);

        } catch (\GuzzleHttp\Exception\ClientException $e) {
            // 4xx errors (like 400 Bad Request)
            $responseBody = $e->getResponse()->getBody()->getContents();
            \Log::error('Face API client error (4xx)', [
                'status' => $e->getResponse()->getStatusCode(),
                'response' => $responseBody,
                'message' => $e->getMessage(),
            ]);
            return ResponseHelper::error('Invalid request to face recognition API: ' . $responseBody);
        } catch (\GuzzleHttp\Exception\ServerException $e) {
            // 5xx errors
            $responseBody = $e->getResponse()->getBody()->getContents();
            \Log::error('Face API server error (5xx)', [
                'status' => $e->getResponse()->getStatusCode(),
                'response' => $responseBody,
            ]);
            return ResponseHelper::error('Face recognition service error: ' . $responseBody);
        } catch (\GuzzleHttp\Exception\ConnectException $e) {
            \Log::error('Cannot connect to face API', ['error' => $e->getMessage()]);
            return ResponseHelper::error('Cannot connect to face recognition service. Please ensure the Python API is running on port 3636.');
        } catch (\Exception $e) {
            \Log::error('Face recognition error: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString(),
            ]);
            return ResponseHelper::error('Face recognition failed: ' . $e->getMessage());
        }
    }

    /**
     * Display attendance history
     */
    public function history(Request $request): Response
    {
        $filters = $request->only(['date_from', 'date_to', 'session_id']);

        // This would query your local database for attendance records
        // Placeholder for now
        $attendanceRecords = [];

        return Inertia::render('Teacher/Attendance/History', [
            'records' => $attendanceRecords,
            'filters' => $filters,
        ]);
    }

    /**
     * Show review page for attendance session
     */
    public function review(ClassModel $class, Request $request): Response
    {
        // Verify teacher owns this class
        if ($class->teacher_id !== auth()->id()) {
            abort(403, 'Unauthorized');
        }

        $validated = $request->validate([
            'scanned_students' => 'required|array',
            'scanned_students.*.student_id' => 'required|exists:users,id',
            'scanned_students.*.student_name' => 'required|string',
            'scanned_students.*.student_email' => 'required|email',
            'scanned_students.*.status' => 'required|in:present,late,absent',
            'scanned_students.*.method' => 'required|string',
            'scanned_students.*.confidence' => 'nullable|numeric',
            'scanned_students.*.notes' => 'nullable|string',
            'date' => 'required|date',
        ]);

        // Load all students in the class
        $allStudents = $class->students()->get();

        return Inertia::render('Teacher/Attendance/Review', [
            'classData' => $class,
            'scannedStudents' => $validated['scanned_students'],
            'allStudents' => $allStudents,
            'date' => $validated['date'],
        ]);
    }

    /**
     * Save attendance session
     */
    public function saveSession(ClassModel $class, Request $request): \Illuminate\Http\RedirectResponse
    {
        // Verify teacher owns this class
        if ($class->teacher_id !== auth()->id()) {
            abort(403, 'Unauthorized');
        }

        $validated = $request->validate([
            'date' => 'required|date',
            'attendance_records' => 'required|array',
            'attendance_records.*.student_id' => 'required|exists:users,id',
            'attendance_records.*.status' => 'required|in:present,late,absent',
            'attendance_records.*.method' => 'required|string',
            'attendance_records.*.confidence' => 'nullable|numeric',
            'attendance_records.*.notes' => 'nullable|string',
        ]);

        try {
            \DB::beginTransaction();

            $date = $validated['date'];
            $savedCount = 0;

            foreach ($validated['attendance_records'] as $record) {
                // Create or update attendance record
                \App\Models\Attendance::updateOrCreate(
                    [
                        'student_id' => $record['student_id'],
                        'class_id' => $class->id,
                        'date' => $date,
                    ],
                    [
                        'status' => $record['status'],
                        'method' => $record['method'],
                        'marked_at' => now(),
                        'notes' => $record['notes'] ?? null,
                    ]
                );
                $savedCount++;
            }

            \DB::commit();

            return redirect()
                ->route('teacher.classes.index')
                ->with('success', "Attendance saved successfully for {$savedCount} student(s)");

        } catch (\Exception $e) {
            \DB::rollBack();
            \Log::error('Error saving attendance session', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()
                ->back()
                ->withErrors(['error' => 'Failed to save attendance: ' . $e->getMessage()]);
        }
    }

    /**
     * Mark attendance manually (single student)
     */
    public function markAttendance(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'class_id' => 'required|exists:classes,id',
            'student_id' => 'required|exists:users,id',
            'status' => 'required|in:present,late,absent',
            'notes' => 'nullable|string',
        ]);

        try {
            $class = ClassModel::findOrFail($validated['class_id']);
            
            // Verify teacher owns this class
            if ($class->teacher_id !== auth()->id()) {
                return ResponseHelper::error('Unauthorized', 403);
            }

            // Create or update attendance record for today
            \App\Models\Attendance::updateOrCreate(
                [
                    'student_id' => $validated['student_id'],
                    'class_id' => $validated['class_id'],
                    'date' => now()->toDateString(),
                ],
                [
                    'status' => $validated['status'],
                    'method' => 'manual',
                    'marked_at' => now(),
                    'notes' => $validated['notes'] ?? null,
                ]
            );

            return ResponseHelper::success([
                'message' => 'Attendance marked successfully',
            ]);
        } catch (\Exception $e) {
            return ResponseHelper::error('Failed to mark attendance: ' . $e->getMessage());
        }
    }

    /**
     * Get attendance report for a class
     */
    public function report(ClassModel $class): Response
    {
        // Verify teacher owns this class
        if ($class->teacher_id !== auth()->id()) {
            abort(403, 'Unauthorized');
        }

        // TODO: Implement attendance report
        return Inertia::render('Teacher/Attendance/Report', [
            'class' => $class,
            'attendanceData' => [],
        ]);
    }

    /**
     * Get attendance statistics
     */
    public function stats(Request $request): JsonResponse
    {
        $filters = $request->only(['date_from', 'date_to']);

        $stats = $this->attendanceService->getAttendanceStats($filters);

        if ($stats['success']) {
            return ResponseHelper::success($stats['data']);
        }

        return ResponseHelper::error(
            $stats['error'] ?? 'Failed to retrieve statistics'
        );
    }

    /**
     * Export attendance records
     */
    public function export(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'format' => 'required|in:csv,xlsx,pdf',
            'date_from' => 'nullable|date',
            'date_to' => 'nullable|date',
        ]);

        // Export logic would go here
        // Placeholder for now

        return ResponseHelper::success([
            'download_url' => '#',
        ], 'Export generated successfully');
    }
}
