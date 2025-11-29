import axios from 'axios';
import API_ENDPOINTS from '@/constants/apiEndpoints';

/**
 * Recognition Service
 * Handles face recognition operations
 */
class RecognizeService {
    /**
     * Recognize face for attendance
     */
    async recognize(imageData, sessionId = null) {
        try {
            const response = await axios.post(API_ENDPOINTS.teacher.attendance.recognize, {
                image: imageData,
                session_id: sessionId,
            });
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    /**
     * Verify face against specific user
     */
    async verify(imageData, userId) {
        try {
            const response = await axios.post('/api/verify-face', {
                image: imageData,
                user_id: userId,
            });
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    /**
     * Get attendance statistics
     */
    async getStats(filters = {}) {
        try {
            const response = await axios.get(API_ENDPOINTS.teacher.attendance.stats, {
                params: filters,
            });
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    /**
     * Export attendance records
     */
    async export(format, filters = {}) {
        try {
            const response = await axios.post(API_ENDPOINTS.teacher.attendance.export, {
                format,
                ...filters,
            });
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    /**
     * Handle API errors
     */
    handleError(error) {
        if (error.response) {
            return {
                message: error.response.data.message || 'An error occurred',
                errors: error.response.data.errors || null,
                status: error.response.status,
            };
        } else if (error.request) {
            return {
                message: 'Network error. Please check your connection.',
                errors: null,
                status: 0,
            };
        } else {
            return {
                message: error.message || 'An unexpected error occurred',
                errors: null,
                status: 0,
            };
        }
    }
}

export default new RecognizeService();
