<?php

namespace App\Enums;

enum AttendanceStatus: string
{
    case PRESENT = 'present';
    case ABSENT = 'absent';
    case LATE = 'late';
    case EXCUSED = 'excused';

    /**
     * Get all status values as an array
     */
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    /**
     * Get status label for display
     */
    public function label(): string
    {
        return match ($this) {
            self::PRESENT => 'Present',
            self::ABSENT => 'Absent',
            self::LATE => 'Late',
            self::EXCUSED => 'Excused',
        };
    }

    /**
     * Get color class for UI display
     */
    public function color(): string
    {
        return match ($this) {
            self::PRESENT => 'success',
            self::ABSENT => 'danger',
            self::LATE => 'warning',
            self::EXCUSED => 'info',
        };
    }

    /**
     * Get hex color for charts and visualizations
     */
    public function hexColor(): string
    {
        return match ($this) {
            self::PRESENT => '#10b981',
            self::ABSENT => '#ef4444',
            self::LATE => '#f59e0b',
            self::EXCUSED => '#3b82f6',
        };
    }

    /**
     * Get icon class for UI display
     */
    public function icon(): string
    {
        return match ($this) {
            self::PRESENT => 'check-circle',
            self::ABSENT => 'x-circle',
            self::LATE => 'clock',
            self::EXCUSED => 'information-circle',
        };
    }

    /**
     * Check if status counts as attended
     */
    public function isAttended(): bool
    {
        return in_array($this, [self::PRESENT, self::LATE]);
    }
}
