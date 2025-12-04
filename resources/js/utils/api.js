import axios from 'axios';

/**
 * API Utility
 * Centralized axios instance with error handling
 */

// Create axios instance with default config
const api = axios.create({
    baseURL: '/',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        // Add CSRF token if available
        const token = document.head.querySelector('meta[name="csrf-token"]');
        if (token) {
            config.headers['X-CSRF-TOKEN'] = token.content;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle errors globally
        if (error.response) {
            // Server responded with error status
            const { status, data } = error.response;

            switch (status) {
                case 401:
                    // Unauthorized - redirect to login
                    window.location.href = '/login';
                    break;
                case 403:
                    // Forbidden
                    console.error('Access forbidden:', data.message);
                    break;
                case 404:
                    // Not found
                    console.error('Resource not found');
                    break;
                case 422:
                    // Validation error - let component handle it
                    break;
                case 500:
                    // Server error
                    console.error('Server error:', data.message);
                    break;
                default:
                    console.error('API error:', data.message || 'Unknown error');
            }
        } else if (error.request) {
            // Request made but no response
            console.error('Network error: No response from server');
        } else {
            // Something else happened
            console.error('Request error:', error.message);
        }

        return Promise.reject(error);
    }
);

export default api;
