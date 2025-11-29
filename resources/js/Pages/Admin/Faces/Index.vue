<template>
  <AppLayout>
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Registered Faces</h1>
          <p class="mt-2 text-sm text-gray-600">Manage all registered faces in the system</p>
        </div>
        <Link
          href="/admin/faces/create"
          class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
        >
          Register New Face
        </Link>
      </div>

      <!-- Error Message -->
      <div v-if="!success && error" class="bg-red-50 border border-red-200 rounded-lg p-4">
        <p class="text-sm text-red-800">{{ error }}</p>
      </div>

      <!-- Data Table -->
      <DataTable
        title="Faces"
        :columns="columns"
        :data="faces"
        empty-message="No faces registered yet"
      >
        <template #cell-image="{ row }">
          <img
            v-if="row.image_url"
            :src="row.image_url"
            :alt="row.name"
            class="w-12 h-12 rounded-full object-cover"
          />
          <div v-else class="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
            <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </template>

        <template #cell-created_at="{ value }">
          {{ formatDate(value) }}
        </template>

        <template #actions="{ row }">
          <div class="flex gap-2">
            <Link
              :href="`/admin/faces/${row.id}/edit`"
              class="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
            >
              Edit
            </Link>
            <button
              @click="handleDelete(row.id)"
              class="text-red-600 hover:text-red-900 text-sm font-medium"
            >
              Delete
            </button>
          </div>
        </template>
      </DataTable>
    </div>

    <!-- Loading Overlay -->
    <LoadingOverlay :show="isDeleting" message="Deleting face..." />
  </AppLayout>
</template>

<script setup>
import { ref, inject } from 'vue';
import { Link, router } from '@inertiajs/vue3';
import AppLayout from '@/Layouts/AppLayout.vue';
import DataTable from '@/Components/Common/DataTable.vue';
import LoadingOverlay from '@/Components/Common/LoadingOverlay.vue';
import FacesService from '@/services/FacesService';

const props = defineProps({
  faces: {
    type: Array,
    required: true,
  },
  success: {
    type: Boolean,
    default: true,
  },
  error: {
    type: String,
    default: null,
  },
});

const toast = inject('toast');
const isDeleting = ref(false);

const columns = [
  { key: 'image', label: 'Image', sortable: false },
  { key: 'name', label: 'Name', sortable: true },
  { key: 'user_id', label: 'User ID', sortable: true },
  { key: 'created_at', label: 'Registered', sortable: true },
];

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString();
};

const handleDelete = async (id) => {
  if (!confirm('Are you sure you want to delete this face?')) {
    return;
  }

  isDeleting.value = true;

  try {
    const result = await FacesService.delete(id);
    
    if (result.success) {
      toast.success('Face deleted successfully');
      router.reload();
    } else {
      toast.error(result.message || 'Failed to delete face');
    }
  } catch (error) {
    toast.error('An error occurred while deleting the face');
  } finally {
    isDeleting.value = false;
  }
};
</script>
