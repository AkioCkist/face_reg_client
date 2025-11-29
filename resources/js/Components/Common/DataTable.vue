<template>
  <div class="bg-white rounded-lg shadow overflow-hidden">
    <!-- Header -->
    <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
      <h3 class="text-lg font-semibold text-gray-900">{{ title }}</h3>
      <slot name="header-actions"></slot>
    </div>

    <!-- Filters -->
    <div v-if="$slots.filters" class="px-6 py-4 bg-gray-50 border-b border-gray-200">
      <slot name="filters"></slot>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              v-for="column in columns"
              :key="column.key"
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              @click="column.sortable && handleSort(column.key)"
            >
              <div class="flex items-center gap-2">
                {{ column.label }}
                <span v-if="column.sortable && sortBy === column.key">
                  <svg v-if="sortDirection === 'asc'" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                  <svg v-else class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" />
                  </svg>
                </span>
              </div>
            </th>
            <th v-if="$slots.actions" scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-if="data.length === 0">
            <td :colspan="columns.length + ($slots.actions ? 1 : 0)" class="px-6 py-8 text-center text-gray-500">
              {{ emptyMessage }}
            </td>
          </tr>
          <tr v-for="(row, index) in data" :key="index" class="hover:bg-gray-50">
            <td v-for="column in columns" :key="column.key" class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              <slot :name="`cell-${column.key}`" :row="row" :value="row[column.key]">
                {{ row[column.key] }}
              </slot>
            </td>
            <td v-if="$slots.actions" class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <slot name="actions" :row="row"></slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div v-if="pagination" class="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
      <div class="text-sm text-gray-700">
        Showing {{ pagination.from }} to {{ pagination.to }} of {{ pagination.total }} results
      </div>
      <div class="flex gap-2">
        <button
          v-for="page in paginationPages"
          :key="page"
          @click="handlePageChange(page)"
          :class="[
            'px-3 py-1 rounded text-sm',
            page === pagination.current_page
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300',
          ]"
        >
          {{ page }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  columns: {
    type: Array,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
  pagination: {
    type: Object,
    default: null,
  },
  emptyMessage: {
    type: String,
    default: 'No data available',
  },
});

const emit = defineEmits(['sort', 'page-change']);

const sortBy = ref(null);
const sortDirection = ref('asc');

const handleSort = (key) => {
  if (sortBy.value === key) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortBy.value = key;
    sortDirection.value = 'asc';
  }
  
  emit('sort', { key: sortBy.value, direction: sortDirection.value });
};

const handlePageChange = (page) => {
  emit('page-change', page);
};

const paginationPages = computed(() => {
  if (!props.pagination) return [];
  
  const pages = [];
  const total = props.pagination.last_page;
  const current = props.pagination.current_page;
  
  // Show max 5 pages
  let start = Math.max(1, current - 2);
  let end = Math.min(total, current + 2);
  
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  
  return pages;
});
</script>
