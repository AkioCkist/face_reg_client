<template>
  <div class="recognition-result bg-white rounded-lg shadow-lg p-6">
    <!-- Success State -->
    <div v-if="result.recognized" class="text-center">
      <div class="mb-4">
        <svg class="w-16 h-16 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      
      <h3 class="text-xl font-semibold text-gray-900 mb-2">Face Recognized!</h3>
      
      <div class="space-y-2 text-left max-w-md mx-auto">
        <div class="flex justify-between items-center py-2 border-b border-gray-200">
          <span class="text-sm font-medium text-gray-600">Name:</span>
          <span class="text-sm font-semibold text-gray-900">{{ result.name }}</span>
        </div>
        
        <div class="flex justify-between items-center py-2 border-b border-gray-200">
          <span class="text-sm font-medium text-gray-600">User ID:</span>
          <span class="text-sm text-gray-900">{{ result.user_id }}</span>
        </div>
        
        <div class="flex justify-between items-center py-2 border-b border-gray-200">
          <span class="text-sm font-medium text-gray-600">Confidence:</span>
          <span class="text-sm font-semibold" :class="confidenceColorClass">
            {{ (result.confidence * 100).toFixed(1) }}%
          </span>
        </div>
        
        <div v-if="result.status" class="flex justify-between items-center py-2">
          <span class="text-sm font-medium text-gray-600">Status:</span>
          <span
            :class="[
              'px-3 py-1 rounded-full text-xs font-semibold',
              statusColorClass,
            ]"
          >
            {{ result.status }}
          </span>
        </div>
      </div>
    </div>

    <!-- Failure State -->
    <div v-else class="text-center">
      <div class="mb-4">
        <svg class="w-16 h-16 mx-auto text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      
      <h3 class="text-xl font-semibold text-gray-900 mb-2">Face Not Recognized</h3>
      <p class="text-sm text-gray-600">{{ result.message || 'No matching face found in the database.' }}</p>
    </div>

    <!-- Actions -->
    <div class="mt-6 flex justify-center gap-4">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  result: {
    type: Object,
    required: true,
  },
});

const confidenceColorClass = computed(() => {
  const confidence = props.result.confidence || 0;
  if (confidence >= 0.9) return 'text-green-600';
  if (confidence >= 0.7) return 'text-yellow-600';
  return 'text-red-600';
});

const statusColorClass = computed(() => {
  const status = props.result.status?.toLowerCase();
  switch (status) {
    case 'present':
      return 'bg-green-100 text-green-800';
    case 'late':
      return 'bg-yellow-100 text-yellow-800';
    case 'absent':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
});
</script>
