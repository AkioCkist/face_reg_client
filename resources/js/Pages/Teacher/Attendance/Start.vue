<template>
  <AppLayout>
    <div class="max-w-4xl mx-auto space-y-6">
      <!-- Header -->
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Take Attendance</h1>
        <p class="mt-2 text-sm text-gray-600">Use face recognition to mark attendance</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Webcam Panel -->
        <div>
          <WebcamPanel
            title="Scan Face"
            @capture="handleRecognize"
            @error="handleWebcamError"
          />
        </div>

        <!-- Recognition Result -->
        <div v-if="recognitionResult">
          <RecognitionResult :result="recognitionResult">
            <template #actions>
              <button
                @click="recognitionResult = null"
                class="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
              >
                Scan Another
              </button>
            </template>
          </RecognitionResult>
        </div>

        <!-- Instructions -->
        <div v-else class="bg-white rounded-lg shadow-lg p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Instructions</h3>
          <ol class="list-decimal list-inside space-y-2 text-sm text-gray-600">
            <li>Click "Start Camera" to activate the webcam</li>
            <li>Position the student's face in the frame</li>
            <li>Click "Capture" to take a photo</li>
            <li>The system will automatically recognize the face</li>
            <li>Attendance will be marked if recognized</li>
          </ol>

          <div class="mt-6 p-4 bg-blue-50 rounded-lg">
            <p class="text-sm text-blue-800">
              <strong>Tip:</strong> Ensure good lighting and the face is clearly visible for best results.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading Overlay -->
    <LoadingOverlay :show="isRecognizing" message="Recognizing face..." />
  </AppLayout>
</template>

<script setup>
import { ref, inject } from 'vue';
import AppLayout from '@/Layouts/AppLayout.vue';
import WebcamPanel from '@/Components/Face/WebcamPanel.vue';
import RecognitionResult from '@/Components/Attendance/RecognitionResult.vue';
import LoadingOverlay from '@/Components/Common/LoadingOverlay.vue';
import RecognizeService from '@/services/RecognizeService';

const toast = inject('toast');

const recognitionResult = ref(null);
const isRecognizing = ref(false);

const handleRecognize = async (imageData) => {
  isRecognizing.value = true;
  recognitionResult.value = null;

  try {
    const result = await RecognizeService.recognize(imageData);
    
    if (result.success) {
      recognitionResult.value = result.data;
      
      if (result.data.recognized) {
        toast.success('Face recognized and attendance marked');
      } else {
        toast.warning('Face not recognized');
      }
    } else {
      toast.error(result.message || 'Recognition failed');
    }
  } catch (error) {
    toast.error('An error occurred during recognition');
  } finally {
    isRecognizing.value = false;
  }
};

const handleWebcamError = (error) => {
  toast.error(error);
};
</script>
