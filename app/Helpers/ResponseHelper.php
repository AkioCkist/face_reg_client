<?php

namespace App\Helpers;

use Illuminate\Http\JsonResponse;

class ResponseHelper
{
    /**
     * Return a success JSON response
     */
    public static function success(
        mixed $data = null,
        string $message = 'Operation successful',
        int $code = 200
    ): JsonResponse {
        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $data,
        ], $code);
    }

    /**
     * Return an error JSON response
     */
    public static function error(
        string $message = 'Operation failed',
        mixed $errors = null,
        int $code = 400
    ): JsonResponse {
        $response = [
            'success' => false,
            'message' => $message,
        ];

        if ($errors !== null) {
            $response['errors'] = $errors;
        }

        return response()->json($response, $code);
    }

    /**
     * Return a validation error response
     */
    public static function validationError(
        array $errors,
        string $message = 'Validation failed'
    ): JsonResponse {
        return self::error($message, $errors, 422);
    }

    /**
     * Return a not found response
     */
    public static function notFound(
        string $message = 'Resource not found'
    ): JsonResponse {
        return self::error($message, null, 404);
    }

    /**
     * Return an unauthorized response
     */
    public static function unauthorized(
        string $message = 'Unauthorized access'
    ): JsonResponse {
        return self::error($message, null, 401);
    }

    /**
     * Return a forbidden response
     */
    public static function forbidden(
        string $message = 'Access forbidden'
    ): JsonResponse {
        return self::error($message, null, 403);
    }

    /**
     * Return a server error response
     */
    public static function serverError(
        string $message = 'Internal server error',
        mixed $errors = null
    ): JsonResponse {
        return self::error($message, $errors, 500);
    }

    /**
     * Return a created response
     */
    public static function created(
        mixed $data = null,
        string $message = 'Resource created successfully'
    ): JsonResponse {
        return self::success($data, $message, 201);
    }

    /**
     * Return a no content response
     */
    public static function noContent(): JsonResponse
    {
        return response()->json(null, 204);
    }
}
