<?php

return [
    'backend_api' => [
        'url' => env('BACKEND_API_URL', 'http://localhost:8001'),
        'timeout' => env('BACKEND_API_TIMEOUT', 30),
    ],

    'face_recognition' => [
        'url' => env('FACE_RECOGNITION_URL', 'http://localhost:8000'),
        'timeout' => env('FACE_RECOGNITION_TIMEOUT', 30),
        'confidence_threshold' => env('FACE_CONFIDENCE_THRESHOLD', 0.85),
    ],

    'attendance' => [
        'statuses' => ['present', 'late', 'absent'],
        'methods' => ['manual', 'face'],
    ],

    'pagination' => [
        'classes_per_page' => 15,
        'students_per_page' => 20,
        'attendance_per_page' => 20,
    ],
];
