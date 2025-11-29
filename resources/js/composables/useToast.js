import { ref } from 'vue';

/**
 * Toast Composable
 * Provides toast notification functionality
 */
export function useToast() {
    const toasts = ref([]);
    let nextId = 0;

    /**
     * Show a toast notification
     */
    const show = (message, type = 'info', duration = 3000) => {
        const id = nextId++;
        const toast = {
            id,
            message,
            type, // success, error, warning, info
            duration,
        };

        toasts.value.push(toast);

        if (duration > 0) {
            setTimeout(() => {
                remove(id);
            }, duration);
        }

        return id;
    };

    /**
     * Show success toast
     */
    const success = (message, duration = 3000) => {
        return show(message, 'success', duration);
    };

    /**
     * Show error toast
     */
    const error = (message, duration = 5000) => {
        return show(message, 'error', duration);
    };

    /**
     * Show warning toast
     */
    const warning = (message, duration = 4000) => {
        return show(message, 'warning', duration);
    };

    /**
     * Show info toast
     */
    const info = (message, duration = 3000) => {
        return show(message, 'info', duration);
    };

    /**
     * Remove a toast
     */
    const remove = (id) => {
        const index = toasts.value.findIndex((t) => t.id === id);
        if (index !== -1) {
            toasts.value.splice(index, 1);
        }
    };

    /**
     * Clear all toasts
     */
    const clear = () => {
        toasts.value = [];
    };

    return {
        toasts,
        show,
        success,
        error,
        warning,
        info,
        remove,
        clear,
    };
}
