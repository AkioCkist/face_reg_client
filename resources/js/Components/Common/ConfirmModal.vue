<template>
  <Modal :show="show" @close="handleCancel" :maxWidth="maxWidth">
    <div class="p-6">
      <!-- Icon -->
      <div class="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full" :class="iconBgClass">
        <svg class="w-6 h-6" :class="iconColorClass" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            v-if="variant === 'danger'"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
          <path
            v-else
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      <!-- Title -->
      <h3 class="text-lg font-semibold text-gray-900 text-center mb-2">
        {{ title }}
      </h3>

      <!-- Message -->
      <p class="text-sm text-gray-600 text-center mb-6">
        {{ message }}
      </p>

      <!-- Actions -->
      <div class="flex gap-3 justify-end">
        <SecondaryButton @click="handleCancel" :disabled="processing">
          {{ cancelText }}
        </SecondaryButton>
        <DangerButton v-if="variant === 'danger'" @click="handleConfirm" :disabled="processing">
          {{ confirmText }}
        </DangerButton>
        <PrimaryButton v-else @click="handleConfirm" :disabled="processing">
          {{ confirmText }}
        </PrimaryButton>
      </div>
    </div>
  </Modal>
</template>

<script setup>
import { computed } from 'vue';
import Modal from '@/Components/Modal.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import SecondaryButton from '@/Components/SecondaryButton.vue';
import DangerButton from '@/Components/DangerButton.vue';

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  confirmText: {
    type: String,
    default: 'Confirm',
  },
  cancelText: {
    type: String,
    default: 'Cancel',
  },
  variant: {
    type: String,
    default: 'warning', // 'danger' or 'warning'
    validator: (value) => ['danger', 'warning'].includes(value),
  },
  maxWidth: {
    type: String,
    default: 'md',
  },
  processing: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['confirm', 'cancel']);

const iconBgClass = computed(() => {
  return props.variant === 'danger' ? 'bg-red-100' : 'bg-yellow-100';
});

const iconColorClass = computed(() => {
  return props.variant === 'danger' ? 'text-red-600' : 'text-yellow-600';
});

const handleConfirm = () => {
  emit('confirm');
};

const handleCancel = () => {
  emit('cancel');
};
</script>
