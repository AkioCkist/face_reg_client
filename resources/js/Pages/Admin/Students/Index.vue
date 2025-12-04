<template>
  <AppLayout>
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Student Management</h1>
          <p class="mt-2 text-sm text-gray-600">Manage students and teachers</p>
        </div>
        <Link
          :href="route('admin.students.create')"
          class="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Add User
        </Link>
      </div>

      <!-- Data Table -->
      <DataTable
        title="Users"
        :columns="columns"
        :data="users.data"
        :pagination="users.meta"
        @page-change="handlePageChange"
      >
        <!-- Filters Slot -->
        <template #filters>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <!-- Search -->
            <div>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search by name, email, or student ID..."
                class="block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                @input="debounceSearch"
              />
            </div>

            <!-- Role Filter -->
            <div>
              <select
                v-model="roleFilter"
                class="block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                @change="applyFilters"
              >
                <option value="">All Roles</option>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
            </div>

            <!-- Clear Filters -->
            <div class="flex items-end">
              <button
                v-if="hasActiveFilters"
                @click="clearFilters"
                class="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </template>

        <!-- Custom Cell: Role -->
        <template #cell-role="{ value }">
          <span
            :class="[
              'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
              value === 'student' ? 'bg-blue-100 text-blue-800' :
              value === 'teacher' ? 'bg-purple-100 text-purple-800' :
              'bg-gray-100 text-gray-800'
            ]"
          >
            {{ getRoleLabel(value) }}
          </span>
        </template>

        <!-- Custom Cell: Face Status -->
        <template #cell-face_status="{ row }">
          <span
            :class="[
              'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
              row.has_face ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            ]"
          >
            {{ row.has_face ? 'Registered' : 'Not Registered' }}
          </span>
        </template>

        <!-- Actions Slot -->
        <template #actions="{ row }">
          <div class="flex items-center gap-2">
            <!-- Edit Button -->
            <Link
              :href="route('admin.students.edit', row.id)"
              class="text-indigo-600 hover:text-indigo-900"
              title="Edit"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </Link>

            <!-- Remove Face Button -->
            <button
              v-if="row.has_face"
              @click="openRemoveFaceModal(row)"
              class="text-yellow-600 hover:text-yellow-900"
              title="Remove Face Data"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>

            <!-- Delete Button -->
            <button
              @click="openDeleteModal(row)"
              class="text-red-600 hover:text-red-900"
              title="Delete"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </template>
      </DataTable>
    </div>

    <!-- Delete Confirmation Modal -->
    <ConfirmModal
      :show="showDeleteModal"
      title="Delete User"
      :message="`Are you sure you want to delete ${selectedUser?.name}? This action cannot be undone.`"
      confirmText="Delete"
      cancelText="Cancel"
      variant="danger"
      :processing="processing"
      @confirm="confirmDelete"
      @cancel="closeDeleteModal"
    />

    <!-- Remove Face Confirmation Modal -->
    <ConfirmModal
      :show="showRemoveFaceModal"
      title="Remove Face Data"
      :message="`Are you sure you want to remove face data for ${selectedUser?.name}? They will need to re-register their face.`"
      confirmText="Remove"
      cancelText="Cancel"
      variant="warning"
      :processing="processing"
      @confirm="confirmRemoveFace"
      @cancel="closeRemoveFaceModal"
    />
  </AppLayout>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { Link, router } from '@inertiajs/vue3';
import AppLayout from '@/Layouts/AppLayout.vue';
import DataTable from '@/Components/Common/DataTable.vue';
import ConfirmModal from '@/Components/Common/ConfirmModal.vue';
import { ROLE_LABELS } from '@/constants/roles';
import StudentService from '@/services/StudentService';
import { useToast } from '@/composables/useToast';

const props = defineProps({
  users: {
    type: Object,
    required: true,
  },
  filters: {
    type: Object,
    default: () => ({}),
  },
});

const toast = useToast();

// Table columns
const columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'student_id', label: 'Student ID', sortable: false },
  { key: 'role', label: 'Role', sortable: true },
  { key: 'face_status', label: 'Face Status', sortable: false },
  { key: 'created_at', label: 'Created', sortable: true },
];

// Filters
const searchQuery = ref(props.filters.search || '');
const roleFilter = ref(props.filters.role || '');
const processing = ref(false);

// Modals
const showDeleteModal = ref(false);
const showRemoveFaceModal = ref(false);
const selectedUser = ref(null);

// Computed
const hasActiveFilters = computed(() => {
  return searchQuery.value || roleFilter.value;
});

// Debounce search
let searchTimeout = null;
const debounceSearch = () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    applyFilters();
  }, 500);
};

// Apply filters
const applyFilters = () => {
  router.get(route('admin.students.index'), {
    search: searchQuery.value,
    role: roleFilter.value,
  }, {
    preserveState: true,
    preserveScroll: true,
  });
};

// Clear filters
const clearFilters = () => {
  searchQuery.value = '';
  roleFilter.value = '';
  applyFilters();
};

// Pagination
const handlePageChange = (page) => {
  router.get(route('admin.students.index'), {
    page,
    search: searchQuery.value,
    role: roleFilter.value,
  }, {
    preserveState: true,
    preserveScroll: true,
  });
};

// Delete user
const openDeleteModal = (user) => {
  selectedUser.value = user;
  showDeleteModal.value = true;
};

const closeDeleteModal = () => {
  showDeleteModal.value = false;
  selectedUser.value = null;
};

const confirmDelete = async () => {
  processing.value = true;
  
  router.delete(route('admin.students.destroy', selectedUser.value.id), {
    onSuccess: () => {
      toast.success('User deleted successfully');
      closeDeleteModal();
    },
    onError: (errors) => {
      toast.error(errors.message || 'Failed to delete user');
    },
    onFinish: () => {
      processing.value = false;
    },
  });
};

// Remove face
const openRemoveFaceModal = (user) => {
  selectedUser.value = user;
  showRemoveFaceModal.value = true;
};

const closeRemoveFaceModal = () => {
  showRemoveFaceModal.value = false;
  selectedUser.value = null;
};

const confirmRemoveFace = async () => {
  processing.value = true;

  router.delete(route('admin.students.removeFace', selectedUser.value.id), {
    onSuccess: () => {
      toast.success('Face data removed successfully');
      closeRemoveFaceModal();
    },
    onError: (errors) => {
      toast.error(errors.message || 'Failed to remove face data');
    },
    onFinish: () => {
      processing.value = false;
    },
  });
};

// Helper
const getRoleLabel = (role) => {
  return ROLE_LABELS[role] || role;
};
</script>
