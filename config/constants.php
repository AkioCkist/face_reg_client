<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Face Recognition Constants
    |--------------------------------------------------------------------------
    |
    | System-wide constants for the face recognition system.
    | These values should never be hardcoded in the application.
    |
    */

    'face_recognition' => [
        'min_confidence_threshold' => env('FACE_MIN_CONFIDENCE', 0.6),
        'max_image_size' => env('FACE_MAX_IMAGE_SIZE', 5242880), // 5MB in bytes
        'allowed_image_types' => ['image/jpeg', 'image/png', 'image/jpg'],
        'allowed_extensions' => ['jpg', 'jpeg', 'png'],
        'image_quality' => env('FACE_IMAGE_QUALITY', 90),
        'max_faces_per_image' => env('FACE_MAX_PER_IMAGE', 1),
    ],

    'attendance' => [
        'session_timeout' => env('ATTENDANCE_SESSION_TIMEOUT', 3600), // 1 hour in seconds
        'auto_mark_threshold' => env('ATTENDANCE_AUTO_MARK_THRESHOLD', 0.8),
        'max_recognition_attempts' => env('ATTENDANCE_MAX_ATTEMPTS', 3),
    ],

    'pagination' => [
        'default_per_page' => env('PAGINATION_PER_PAGE', 15),
        'max_per_page' => env('PAGINATION_MAX_PER_PAGE', 100),
    ],

    'cache' => [
        'face_list_ttl' => env('CACHE_FACE_LIST_TTL', 300), // 5 minutes
        'config_ttl' => env('CACHE_CONFIG_TTL', 3600), // 1 hour
    ],

    'features' => [
        'enable_face_verification' => env('FEATURE_FACE_VERIFICATION', true),
        'enable_bulk_operations' => env('FEATURE_BULK_OPERATIONS', true),
        'enable_attendance_export' => env('FEATURE_ATTENDANCE_EXPORT', true),
    ],

    'user_management' => [
        'student_id_prefix' => env('STUDENT_ID_PREFIX', 'STU'),
        'student_id_length' => env('STUDENT_ID_LENGTH', 8),
        'default_password_length' => env('DEFAULT_PASSWORD_LENGTH', 12),
        'require_student_id' => env('REQUIRE_STUDENT_ID', false),
    ],

    'messages' => [
        'user' => [
            'created' => 'User created successfully.',
            'updated' => 'User updated successfully.',
            'deleted' => 'User deleted successfully.',
            'face_removed' => 'Face data removed successfully.',
            'not_found' => 'User not found.',
            'cannot_delete_self' => 'You cannot delete your own account.',
            'face_not_found' => 'No face data found for this user.',
        ],
        'validation' => [
            'role_invalid' => 'The selected role is invalid.',
            'email_exists' => 'This email is already registered.',
            'student_id_exists' => 'This student ID is already in use.',
        ],
    ],
];
