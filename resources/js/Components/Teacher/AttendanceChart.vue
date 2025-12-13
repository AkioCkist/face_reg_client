<template>
  <div class="w-full h-64 flex items-center justify-center">
    <svg viewBox="0 0 300 200" class="w-full h-full">
      <!-- Define circles -->
      <circle cx="75" cy="100" r="50" fill="#10b981" opacity="0.8" />
      <circle cx="150" cy="80" r="45" fill="#f59e0b" opacity="0.8" />
      <circle cx="200" cy="120" r="40" fill="#ef4444" opacity="0.8" />

      <!-- Labels -->
      <text x="75" y="105" text-anchor="middle" class="text-sm font-bold fill-white">
        {{ stats.present }}
      </text>
      <text x="150" y="85" text-anchor="middle" class="text-sm font-bold fill-white">
        {{ stats.late }}
      </text>
      <text x="200" y="125" text-anchor="middle" class="text-sm font-bold fill-white">
        {{ stats.absent }}
      </text>

      <!-- Legend -->
      <text x="10" y="170" class="text-xs fill-gray-700">
        ● Có mặt: {{ stats.present }}
      </text>
      <text x="110" y="170" class="text-xs fill-gray-700">
        ● Trễ: {{ stats.late }}
      </text>
      <text x="200" y="170" class="text-xs fill-gray-700">
        ● Vắng: {{ stats.absent }}
      </text>
    </svg>
  </div>
</template>

<script setup>
defineProps({
  stats: Object,
});
</script>
