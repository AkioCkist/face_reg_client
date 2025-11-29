<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Helpers\ResponseHelper;
use App\Services\FaceRecognition\FaceService;
use App\Services\FaceRecognition\AttendanceService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    private FaceService $faceService;
    private AttendanceService $attendanceService;

    public function __construct(
        FaceService $faceService,
        AttendanceService $attendanceService
    ) {
        $this->faceService = $faceService;
        $this->attendanceService = $attendanceService;
    }

    /**
     * Display admin dashboard
     */
    public function index(Request $request): Response
    {
        $stats = $this->getDashboardStats();

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
        ]);
    }

    /**
     * Get dashboard statistics
     */
    private function getDashboardStats(): array
    {
        // Get face count
        $facesResponse = $this->faceService->listFaces();
        $totalFaces = $facesResponse['success']
            ? count($facesResponse['data'] ?? [])
            : 0;

        // Get attendance stats
        $attendanceStats = $this->attendanceService->getAttendanceStats();

        return [
            'total_faces' => $totalFaces,
            'total_users' => \App\Models\User::count(),
            'total_sessions' => $attendanceStats['data']['total_sessions'] ?? 0,
            'attendance_rate' => $attendanceStats['data']['attendance_rate'] ?? 0,
            'recent_activities' => $this->getRecentActivities(),
        ];
    }

    /**
     * Get recent activities
     */
    private function getRecentActivities(): array
    {
        // This would typically query your activity log
        // Placeholder for now
        return [];
    }
}
