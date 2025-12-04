<?php

return [
    /*
    |--------------------------------------------------------------------------
    | FastAPI Configuration
    |--------------------------------------------------------------------------
    |
    | Configuration for the FastAPI face recognition backend service.
    | All API communication should use these centralized settings.
    |
    */

    'fastapi' => [
        'base_url' => env('FASTAPI_BASE_URL', 'http://localhost:8000'),
        'timeout' => env('FASTAPI_TIMEOUT', 30),
        'connect_timeout' => env('FASTAPI_CONNECT_TIMEOUT', 10),
        'retry_times' => env('FASTAPI_RETRY_TIMES', 3),
        'retry_delay' => env('FASTAPI_RETRY_DELAY', 1000), // milliseconds

        'endpoints' => [
            'faces' => [
                'register' => '/api/v1/faces/register',
                'list' => '/api/v1/faces',
                'get' => '/api/v1/faces/{id}',
                'update' => '/api/v1/faces/{id}',
                'delete' => '/api/v1/faces/{id}',
                'delete_by_user' => '/api/v1/faces/user/{user_id}',
                'search' => '/api/v1/faces/search',
            ],
            'recognition' => [
                'recognize' => '/api/v1/recognize',
                'verify' => '/api/v1/verify',
            ],
            'config' => [
                'get' => '/api/v1/config',
                'update' => '/api/v1/config',
            ],
            'health' => '/api/v1/health',
        ],

        'auth' => [
            'type' => env('FASTAPI_AUTH_TYPE', 'bearer'), // bearer, api_key, none
            'token' => env('FASTAPI_AUTH_TOKEN'),
            'api_key_header' => env('FASTAPI_API_KEY_HEADER', 'X-API-Key'),
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | API Response Configuration
    |--------------------------------------------------------------------------
    |
    | Standard response format configuration
    |
    */

    'response' => [
        'success_code' => 200,
        'created_code' => 201,
        'error_code' => 400,
        'unauthorized_code' => 401,
        'forbidden_code' => 403,
        'not_found_code' => 404,
        'server_error_code' => 500,
    ],
];
