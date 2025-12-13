<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Http\Resources\AttendanceResource;
use App\Models\Attendance;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AttendanceController extends Controller
{
    /**
     * Display attendance history for the student.
     */
    public function index()
    {
        $user = Auth::user();

        $classId = request()->query('class_id');
        $month = request()->query('month', now()->month);
        $year = request()->query('year', now()->year);

        $query = $user->attendances()
            ->with('class')
            ->whereYear('marked_at', $year)
            ->whereMonth('marked_at', $month);

        if ($classId) {
            $query->where('class_id', $classId);
        }

        $attendances = $query
            ->orderByDesc('marked_at')
            ->paginate(20);

        return Inertia::render('Student/Attendance/Index', [
            'attendances' => AttendanceResource::collection($attendances),
            'classes' => $user->enrolledClasses()->select('id', 'name', 'code')->get(),
            'month' => $month,
            'year' => $year,
            'selectedClass' => $classId,
        ]);
    }

    /**
     * Get attendance statistics for the student.
     */
    public function statistics()
    {
        $user = Auth::user();

        $stats = $user->attendances()
            ->select('class_id')
            ->selectRaw('status, COUNT(*) as count')
            ->groupBy('class_id', 'status')
            ->get();

        return response()->json([
            'data' => $stats,
        ]);
    }
}
