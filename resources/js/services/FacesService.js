import axios from 'axios';
import { router } from '@inertiajs/vue3';
import API_ENDPOINTS from '@/constants/apiEndpoints';

/**
 * Face Service
 * Handles all face-related API operations
 */
class FacesService {
    /**
     * Get all faces
     */
    async list(filters = {}) {
        try {
            const response = await axios.get(API_ENDPOINTS.faces.index, {
                params: filters,
            });
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    /**
     * Register a new face
     */
    async register(data) {
        try {
            const response = await axios.post(API_ENDPOINTS.faces.store, data);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    /**
     * Update a face
     */
    async update(id, data) {
        try {
            const response = await axios.put(API_ENDPOINTS.faces.update(id), data);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    /**
     * Delete a face
     */
    async delete(id) {
        try {
            const response = await axios.delete(API_ENDPOINTS.faces.destroy(id));
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    /**
     * Search faces
     */
    async search(query) {
        try {
            const response = await axios.get(API_ENDPOINTS.faces.search, {
                params: { query },
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
            // Server responded with error
            return {
                message: error.response.data.message || 'An error occurred',
                errors: error.response.data.errors || null,
                status: error.response.status,
            };
        } else if (error.request) {
            // Request made but no response
            return {
                message: 'Network error. Please check your connection.',
                errors: null,
                status: 0,
            };
        } else {
            // Something else happened
            return {
                message: error.message || 'An unexpected error occurred',
                errors: null,
                status: 0,
            };
        }
    }
}

export default new FacesService();
