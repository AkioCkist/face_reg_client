<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Helpers\ResponseHelper;
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
     * Display attendance start page
     */
    public function start(): Response
    {
        return Inertia::render('Teacher/Attendance/Start');
    }

    /**
     * Process face recognition for attendance
     */
    public function recognize(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'image' => 'required|string',
            'session_id' => 'nullable|string',
        ]);

        $recognitionResult = $this->attendanceService->recognizeFace(
            $validated['image']
        );

        if (!$recognitionResult['success']) {
            return ResponseHelper::error(
                $recognitionResult['error'] ?? 'Recognition failed'
            );
        }

        // Process attendance if face was recognized
        if ($recognitionResult['data']['recognized'] ?? false) {
            $attendanceResult = $this->attendanceService->processAttendance(
                $recognitionResult['data'],
                ['session_id' => $validated['session_id'] ?? null]
            );

            if ($attendanceResult['success']) {
                return ResponseHelper::success(
                    $attendanceResult['data'],
                    'Attendance marked successfully'
                );
            }
        }

        return ResponseHelper::success(
            $recognitionResult['data'],
            'Face not recognized'
        );
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
