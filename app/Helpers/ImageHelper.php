<?php

namespace App\Helpers;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ImageHelper
{
    /**
     * Convert base64 string to image file
     */
    public static function base64ToImage(string $base64String): ?string
    {
        try {
            // Remove data URI prefix if present
            $base64String = preg_replace('/^data:image\/\w+;base64,/', '', $base64String);

            $imageData = base64_decode($base64String);

            if ($imageData === false) {
                return null;
            }

            return $imageData;
        } catch (\Exception $e) {
            return null;
        }
    }

    /**
     * Convert image to base64 string
     */
    public static function imageToBase64(string $imagePath): ?string
    {
        try {
            if (!file_exists($imagePath)) {
                return null;
            }

            $imageData = file_get_contents($imagePath);
            $base64 = base64_encode($imageData);

            $mimeType = mime_content_type($imagePath);

            return "data:{$mimeType};base64,{$base64}";
        } catch (\Exception $e) {
            return null;
        }
    }

    /**
     * Validate image file
     */
    public static function validateImage(UploadedFile $file): array
    {
        $errors = [];

        $allowedTypes = config('constants.face_recognition.allowed_image_types');
        $maxSize = config('constants.face_recognition.max_image_size');

        if (!in_array($file->getMimeType(), $allowedTypes)) {
            $errors[] = 'Invalid image type. Allowed types: ' . implode(', ', $allowedTypes);
        }

        if ($file->getSize() > $maxSize) {
            $maxSizeMB = $maxSize / 1048576;
            $errors[] = "Image size exceeds maximum allowed size of {$maxSizeMB}MB";
        }

        return $errors;
    }

    /**
     * Validate base64 image string
     */
    public static function validateBase64Image(string $base64String): array
    {
        $errors = [];

        // Remove data URI prefix if present
        $base64String = preg_replace('/^data:image\/\w+;base64,/', '', $base64String);

        // Check if valid base64
        if (!base64_decode($base64String, true)) {
            $errors[] = 'Invalid base64 image string';
            return $errors;
        }

        $imageData = base64_decode($base64String);
        $imageSize = strlen($imageData);
        $maxSize = config('constants.face_recognition.max_image_size');

        if ($imageSize > $maxSize) {
            $maxSizeMB = $maxSize / 1048576;
            $errors[] = "Image size exceeds maximum allowed size of {$maxSizeMB}MB";
        }

        return $errors;
    }

    /**
     * Check if a string is valid base64
     */
    public static function isBase64(string $string): bool
    {
        // Remove data URI prefix if present
        $string = preg_replace('/^data:image\/\w+;base64,/', '', $string);
        
        // Check if it's valid base64
        return base64_decode($string, true) !== false;
    }
    }

    /**
     * Generate unique filename for image
     */
    public static function generateFilename(string $extension = 'jpg'): string
    {
        return Str::uuid() . '.' . $extension;
    }

    /**
     * Save base64 image to storage
     */
    public static function saveBase64Image(
        string $base64String,
        string $directory = 'faces',
        string $disk = 'public'
    ): ?string {
        try {
            $imageData = self::base64ToImage($base64String);

            if ($imageData === null) {
                return null;
            }

            $filename = self::generateFilename();
            $path = "{$directory}/{$filename}";

            Storage::disk($disk)->put($path, $imageData);

            return $path;
        } catch (\Exception $e) {
            return null;
        }
    }

    /**
     * Delete image from storage
     */
    public static function deleteImage(string $path, string $disk = 'public'): bool
    {
        try {
            if (Storage::disk($disk)->exists($path)) {
                return Storage::disk($disk)->delete($path);
            }
            return false;
        } catch (\Exception $e) {
            return false;
        }
    }

    /**
     * Get image URL from storage path
     */
    public static function getImageUrl(string $path, string $disk = 'public'): ?string
    {
        try {
            if (Storage::disk($disk)->exists($path)) {
                return Storage::disk($disk)->url($path);
            }
            return null;
        } catch (\Exception $e) {
            return null;
        }
    }
}
