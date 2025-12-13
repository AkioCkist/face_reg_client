<?php

namespace App\Enums;

enum AttendanceMethod: string
{
    case MANUAL = 'manual';
    case FACE = 'face';

    public function label(): string
    {
        return match($this) {
            self::MANUAL => 'Điểm danh thủ công',
            self::FACE => 'Nhận diện khuôn mặt',
        };
    }
}
