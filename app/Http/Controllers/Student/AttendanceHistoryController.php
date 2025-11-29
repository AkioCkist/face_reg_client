<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Helpers\ResponseHelper;
use App\Services\FaceRecognition\AttendanceService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;
use Inertia\Response;

class AttendanceHistoryController extends Controller
{
    private AttendanceService $attendanceService;

    public function __construct(AttendanceService $attendanceService)
    {
        $this->attendanceService = $attendanceService;
    }

    /**
     * Display student's attendance history
     */
    public function index(Request $request): Response
    {
        $user = $request->user();
        $filters = $request->only(['date_from', 'date_to', 'status']);

        // This would query your local database for student's attendance
        // Placeholder for now
        $attendanceRecords = [];

        return Inertia::render('Student/AttendanceHistory', [
            'records' => $attendanceRecords,
            'filters' => $filters,
        ]);
    }

    /**
     * Get student's attendance statistics
     */
    public function stats(Request $request): JsonResponse
    {
        $user = $request->user();

        $stats = $this->attendanceService->getAttendanceStats([
            'user_id' => $user->id,
        ]);

        if ($stats['success']) {
            return ResponseHelper::success($stats['data']);
        }

        return ResponseHelper::error(
            $stats['error'] ?? 'Failed to retrieve statistics'
        );
    }

    /**
     * Export student's attendance records
     */
    public function export(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'format' => 'required|in:csv,pdf',
            'date_from' => 'nullable|date',
            'date_to' => 'nullable|date',
        ]);

        $user = $request->user();

        // Export logic would go here
        // Placeholder for now

        return ResponseHelper::success([
            'download_url' => '#',
        ], 'Export generated successfully');
    }
}
