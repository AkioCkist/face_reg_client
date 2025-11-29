import { ref, onMounted, onUnmounted } from 'vue';
import { ERROR_MESSAGES } from '@/constants/messages';

/**
 * Webcam Composable
 * Provides webcam functionality
 */
export function useWebcam() {
    const videoRef = ref(null);
    const stream = ref(null);
    const devices = ref([]);
    const selectedDevice = ref(null);
    const isActive = ref(false);
    const error = ref(null);

    /**
     * Get available video devices
     */
    const getDevices = async () => {
        try {
            const deviceList = await navigator.mediaDevices.enumerateDevices();
            devices.value = deviceList.filter((device) => device.kind === 'videoinput');

            if (devices.value.length > 0 && !selectedDevice.value) {
                selectedDevice.value = devices.value[0].deviceId;
            }

            return devices.value;
        } catch (err) {
            error.value = ERROR_MESSAGES.WEBCAM_NOT_FOUND;
            throw err;
        }
    };

    /**
     * Start webcam
     */
    const start = async (deviceId = null) => {
        try {
            error.value = null;

            const constraints = {
                video: {
                    deviceId: deviceId || selectedDevice.value || undefined,
                    width: { ideal: 1280 },
                    height: { ideal: 720 },
                },
            };

            stream.value = await navigator.mediaDevices.getUserMedia(constraints);

            if (videoRef.value) {
                videoRef.value.srcObject = stream.value;
            }

            isActive.value = true;

            // Get devices after permission granted
            await getDevices();

            return stream.value;
        } catch (err) {
            error.value = err.name === 'NotAllowedError'
                ? ERROR_MESSAGES.WEBCAM_ACCESS_DENIED
                : ERROR_MESSAGES.WEBCAM_NOT_FOUND;
            isActive.value = false;
            throw err;
        }
    };

    /**
     * Stop webcam
     */
    const stop = () => {
        if (stream.value) {
            stream.value.getTracks().forEach((track) => track.stop());
            stream.value = null;
        }

        if (videoRef.value) {
            videoRef.value.srcObject = null;
        }

        isActive.value = false;
    };

    /**
     * Capture image from webcam
     */
    const capture = () => {
        if (!videoRef.value || !isActive.value) {
            return null;
        }

        const canvas = document.createElement('canvas');
        canvas.width = videoRef.value.videoWidth;
        canvas.height = videoRef.value.videoHeight;

        const context = canvas.getContext('2d');
        context.drawImage(videoRef.value, 0, 0, canvas.width, canvas.height);

        return canvas.toDataURL('image/jpeg', 0.9);
    };

    /**
     * Switch to different camera
     */
    const switchCamera = async (deviceId) => {
        stop();
        selectedDevice.value = deviceId;
        await start(deviceId);
    };

    /**
     * Cleanup on unmount
     */
    onUnmounted(() => {
        stop();
    });

    return {
        videoRef,
        stream,
        devices,
        selectedDevice,
        isActive,
        error,
        getDevices,
        start,
        stop,
        capture,
        switchCamera,
    };
}
