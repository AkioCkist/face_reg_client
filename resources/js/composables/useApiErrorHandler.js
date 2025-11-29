import { useToast } from './useToast';
import { ERROR_MESSAGES } from '@/constants/messages';

/**
 * API Error Handler Composable
 * Centralized error handling for API calls
 */
export function useApiErrorHandler() {
    const { error: showError } = useToast();

    /**
     * Handle API error response
     */
    const handleError = (error, customMessage = null) => {
        let message = customMessage || ERROR_MESSAGES.GENERIC;
        let errors = null;

        if (error.response) {
            // Server responded with error
            message = error.response.data?.message || message;
            errors = error.response.data?.errors || null;

            // Handle specific status codes
            switch (error.response.status) {
                case 401:
                    message = ERROR_MESSAGES.UNAUTHORIZED;
                    break;
                case 403:
                    message = ERROR_MESSAGES.UNAUTHORIZED;
                    break;
                case 404:
                    message = ERROR_MESSAGES.NOT_FOUND;
                    break;
                case 422:
                    message = error.response.data?.message || ERROR_MESSAGES.VALIDATION;
                    break;
                case 500:
                    message = ERROR_MESSAGES.GENERIC;
                    break;
            }
        } else if (error.request) {
            // Request made but no response
            message = ERROR_MESSAGES.NETWORK;
        } else {
            // Something else happened
            message = error.message || ERROR_MESSAGES.GENERIC;
        }

        // Show error toast
        showError(message);

        return {
            message,
            errors,
            status: error.response?.status || 0,
        };
    };

    /**
     * Handle validation errors
     */
    const handleValidationErrors = (errors) => {
        if (!errors || typeof errors !== 'object') {
            return {};
        }

        const formattedErrors = {};

        for (const [field, messages] of Object.entries(errors)) {
            formattedErrors[field] = Array.isArray(messages) ? messages[0] : messages;
        }

        return formattedErrors;
    };

    /**
     * Extract error message from various error formats
     */
    const extractMessage = (error) => {
        if (typeof error === 'string') {
            return error;
        }

        if (error.response?.data?.message) {
            return error.response.data.message;
        }

        if (error.message) {
            return error.message;
        }

        return ERROR_MESSAGES.GENERIC;
    };

    return {
        handleError,
        handleValidationErrors,
        extractMessage,
    };
}
