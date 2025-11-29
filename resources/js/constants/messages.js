// User-facing messages
// Centralized message constants

export const SUCCESS_MESSAGES = {
    FACE_REGISTERED: 'Face registered successfully',
    FACE_UPDATED: 'Face updated successfully',
    FACE_DELETED: 'Face deleted successfully',
    ATTENDANCE_MARKED: 'Attendance marked successfully',
    PROFILE_UPDATED: 'Profile updated successfully',
    CONFIG_UPDATED: 'Configuration updated successfully',
    EXPORT_GENERATED: 'Export generated successfully',
};

export const ERROR_MESSAGES = {
    GENERIC: 'An error occurred. Please try again.',
    NETWORK: 'Network error. Please check your connection.',
    UNAUTHORIZED: 'You are not authorized to perform this action.',
    NOT_FOUND: 'Resource not found.',
    VALIDATION: 'Please check your input and try again.',
    FACE_REGISTRATION_FAILED: 'Failed to register face. Please try again.',
    RECOGNITION_FAILED: 'Face recognition failed. Please try again.',
    NO_FACE_DETECTED: 'No face detected in the image.',
    MULTIPLE_FACES: 'Multiple faces detected. Please ensure only one face is visible.',
    IMAGE_TOO_LARGE: 'Image size is too large. Maximum size is 5MB.',
    INVALID_IMAGE: 'Invalid image format. Please use JPG or PNG.',
    WEBCAM_ACCESS_DENIED: 'Webcam access denied. Please allow camera permissions.',
    WEBCAM_NOT_FOUND: 'No webcam found. Please connect a camera.',
};

export const INFO_MESSAGES = {
    LOADING: 'Loading...',
    PROCESSING: 'Processing...',
    CAPTURING: 'Capturing image...',
    RECOGNIZING: 'Recognizing face...',
    UPLOADING: 'Uploading...',
    EXPORTING: 'Generating export...',
};

export const VALIDATION_MESSAGES = {
    REQUIRED: 'This field is required.',
    EMAIL: 'Please enter a valid email address.',
    MIN_LENGTH: (min) => `Minimum length is ${min} characters.`,
    MAX_LENGTH: (max) => `Maximum length is ${max} characters.`,
    NUMERIC: 'This field must be a number.',
    POSITIVE: 'This field must be a positive number.',
};

export default {
    SUCCESS_MESSAGES,
    ERROR_MESSAGES,
    INFO_MESSAGES,
    VALIDATION_MESSAGES,
};
