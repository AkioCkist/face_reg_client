<?php

namespace App\Enums;

enum UserRole: string
{
    case ADMIN = 'admin';
    case TEACHER = 'teacher';
    case STUDENT = 'student';

    /**
     * Get all role values as an array
     */
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    /**
     * Get role label for display
     */
    public function label(): string
    {
        return match ($this) {
            self::ADMIN => 'Administrator',
            self::TEACHER => 'Teacher',
            self::STUDENT => 'Student',
        };
    }

    /**
     * Check if role has admin privileges
     */
    public function isAdmin(): bool
    {
        return $this === self::ADMIN;
    }

    /**
     * Check if role has teacher privileges
     */
    public function isTeacher(): bool
    {
        return $this === self::TEACHER;
    }

    /**
     * Check if role has student privileges
     */
    public function isStudent(): bool
    {
        return $this === self::STUDENT;
    }

    /**
     * Check if role can manage faces
     */
    public function canManageFaces(): bool
    {
        return in_array($this, [self::ADMIN, self::TEACHER]);
    }

    /**
     * Check if role can take attendance
     */
    public function canTakeAttendance(): bool
    {
        return in_array($this, [self::ADMIN, self::TEACHER]);
    }

    /**
     * Get dashboard route for role
     */
    public function dashboardRoute(): string
    {
        return match ($this) {
            self::ADMIN => 'admin.dashboard',
            self::TEACHER => 'teacher.dashboard',
            self::STUDENT => 'student.dashboard',
        };
    }
}
