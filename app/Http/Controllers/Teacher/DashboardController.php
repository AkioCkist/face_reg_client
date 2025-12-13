<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\ClassModel;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the teacher dashboard.
     */
    public function index()
    {
        $user = Auth::user();

        // Get classes for today
        $today = now()->format('l'); // e.g., "Monday"
        $classesToday = $user->teachingClasses()
            ->where('day_of_week', $today)
            ->get();

        // Get total classes
        $totalClasses = $user->teachingClasses()->count();

        // Get total students
        $totalStudents = $user->teachingClasses()
            ->with('students')
            ->get()
            ->flatMap->students
            ->unique('id')
            ->count();

        // Get attendance statistics
        $attendanceStats = [
            'total' => 0,
            'present' => 0,
            'late' => 0,
            'absent' => 0,
        ];

        $todayAttendances = $user->teachingClasses()
            ->with('attendances')
            ->get()
            ->flatMap->attendances
            ->filter(fn($a) => $a->marked_at?->isToday());

        $attendanceStats['total'] = $todayAttendances->count();
        $attendanceStats['present'] = $todayAttendances->where('status', 'present')->count();
        $attendanceStats['late'] = $todayAttendances->where('status', 'late')->count();
        $attendanceStats['absent'] = $todayAttendances->where('status', 'absent')->count();

        return Inertia::render('Teacher/Dashboard', [
            'totalClasses' => $totalClasses,
            'totalStudents' => $totalStudents,
            'classesToday' => $classesToday,
            'attendanceStats' => $attendanceStats,
        ]);
    }
}
