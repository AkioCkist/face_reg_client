<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Attendance;

class AttendancePolicy
{
    /**
     * Determine whether the user can mark attendance.
     */
    public function mark(User $user): bool
    {
        return $user->isTeacher();
    }

    /**
     * Determine whether the user can view attendance.
     */
    public function view(User $user, Attendance $attendance): bool
    {
        // Teacher can view attendance of their classes
        if ($user->isTeacher()) {
            return $attendance->class->teacher_id === $user->id;
        }

        // Student can view their own attendance
        if ($user->isStudent()) {
            return $attendance->student_id === $user->id;
        }

        return false;
    }
}
