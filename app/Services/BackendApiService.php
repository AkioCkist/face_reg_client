<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Exception;

class BackendApiService
{
    private string $backendUrl;

    public function __construct()
    {
        $this->backendUrl = config('services.backend_api.url', 'http://localhost:8001');
    }

    /**
     * Get classes for a teacher
     */
    public function getTeacherClasses(int $teacherId): array
    {
        try {
            $response = Http::get("{$this->backendUrl}/api/teachers/{$teacherId}/classes");

            if (!$response->successful()) {
                throw new Exception('Failed to fetch teacher classes');
            }

            return $response->json('data', []);
        } catch (Exception $e) {
            \Log::error('Backend API error', [
                'endpoint' => 'getTeacherClasses',
                'error' => $e->getMessage(),
            ]);
            throw $e;
        }
    }

    /**
     * Get students for a class
     */
    public function getClassStudents(int $classId): array
    {
        try {
            $response = Http::get("{$this->backendUrl}/api/classes/{$classId}/students");

            if (!$response->successful()) {
                throw new Exception('Failed to fetch class students');
            }

            return $response->json('data', []);
        } catch (Exception $e) {
            \Log::error('Backend API error', [
                'endpoint' => 'getClassStudents',
                'error' => $e->getMessage(),
            ]);
            throw $e;
        }
    }

    /**
     * Get attendance records for a class
     */
    public function getClassAttendance(int $classId, ?string $date = null): array
    {
        try {
            $params = [];
            if ($date) {
                $params['date'] = $date;
            }

            $response = Http::get("{$this->backendUrl}/api/classes/{$classId}/attendance", $params);

            if (!$response->successful()) {
                throw new Exception('Failed to fetch attendance records');
            }

            return $response->json('data', []);
        } catch (Exception $e) {
            \Log::error('Backend API error', [
                'endpoint' => 'getClassAttendance',
                'error' => $e->getMessage(),
            ]);
            throw $e;
        }
    }

    /**
     * Mark attendance
     */
    public function markAttendance(int $classId, int $studentId, string $status, string $method): array
    {
        try {
            $response = Http::post("{$this->backendUrl}/api/attendance/mark", [
                'class_id' => $classId,
                'student_id' => $studentId,
                'status' => $status,
                'method' => $method,
                'marked_at' => now(),
            ]);

            if (!$response->successful()) {
                throw new Exception('Failed to mark attendance');
            }

            return $response->json();
        } catch (Exception $e) {
            \Log::error('Backend API error', [
                'endpoint' => 'markAttendance',
                'error' => $e->getMessage(),
            ]);
            throw $e;
        }
    }

    /**
     * Get student attendance history
     */
    public function getStudentAttendance(int $studentId, ?int $classId = null): array
    {
        try {
            $params = [];
            if ($classId) {
                $params['class_id'] = $classId;
            }

            $response = Http::get("{$this->backendUrl}/api/students/{$studentId}/attendance", $params);

            if (!$response->successful()) {
                throw new Exception('Failed to fetch student attendance');
            }

            return $response->json('data', []);
        } catch (Exception $e) {
            \Log::error('Backend API error', [
                'endpoint' => 'getStudentAttendance',
                'error' => $e->getMessage(),
            ]);
            throw $e;
        }
    }

    /**
     * Health check
     */
    public function healthCheck(): bool
    {
        try {
            $response = Http::timeout(5)
                ->get("{$this->backendUrl}/health");

            return $response->successful();
        } catch (Exception $e) {
            \Log::warning('Backend API health check failed', [
                'error' => $e->getMessage(),
            ]);
            return false;
        }
    }
}
