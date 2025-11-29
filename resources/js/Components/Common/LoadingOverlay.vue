<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="show"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div class="bg-white rounded-lg p-8 max-w-sm w-full mx-4 text-center">
          <!-- Spinner -->
          <div class="flex justify-center mb-4">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
          
          <!-- Message -->
          <p class="text-gray-700 font-medium">{{ message }}</p>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  message: {
    type: String,
    default: 'Loading...',
  },
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
