import api from '@/utils/api';
import API_ENDPOINTS from '@/constants/apiEndpoints';

/**
 * Student Service
 * Handles student/teacher management API operations
 */
class StudentService {
    /**
     * Delete a student/teacher
     */
    async deleteStudent(id) {
        try {
            const response = await api.delete(API_ENDPOINTS.students.destroy(id));
            return {
                success: true,
                data: response.data,
            };
        } catch (error) {
            return this.handleError(error);
        }
    }

    /**
     * Remove face data for a student/teacher
     */
    async removeFace(id) {
        try {
            const response = await api.delete(API_ENDPOINTS.students.removeFace(id));
            return {
                success: true,
                data: response.data,
            };
        } catch (error) {
            return this.handleError(error);
        }
    }

    /**
     * Handle API errors
     */
    handleError(error) {
        if (error.response) {
            // Server responded with error
            return {
                success: false,
                message: error.response.data.message || 'An error occurred',
                errors: error.response.data.errors || null,
                status: error.response.status,
            };
        } else if (error.request) {
            // Request made but no response
            return {
                success: false,
                message: 'Network error. Please check your connection.',
                errors: null,
                status: 0,
            };
        } else {
            // Something else happened
            return {
                success: false,
                message: error.message || 'An unexpected error occurred',
                errors: null,
                status: 0,
            };
        }
    }
}

export default new StudentService();
