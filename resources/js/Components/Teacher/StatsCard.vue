<template>
  <div class="bg-gradient-to-br p-6 rounded-lg shadow-md" :class="bgGradient">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-gray-600 text-sm font-medium">{{ label }}</p>
        <p class="text-3xl font-bold text-gray-900 mt-2">{{ value }}</p>
      </div>
      <div class="text-5xl opacity-50">{{ icon }}</div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  icon: String,
  label: String,
  value: [Number, String],
  color: {
    type: String,
    default: 'blue',
  },
});

const bgGradient = computed(() => {
  const colors = {
    blue: 'from-blue-50 to-blue-100',
    green: 'from-green-50 to-green-100',
    yellow: 'from-yellow-50 to-yellow-100',
    red: 'from-red-50 to-red-100',
  };
  return colors[props.color] || colors.blue;
});
</script>
