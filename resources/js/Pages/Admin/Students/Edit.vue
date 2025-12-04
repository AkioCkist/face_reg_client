<template>
  <AppLayout>
    <div class="max-w-2xl mx-auto space-y-6">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Edit User</h1>
          <p class="mt-2 text-sm text-gray-600">Update user information</p>
        </div>
        <button
          @click="openDeleteModal"
          class="inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-700 focus:bg-red-700 active:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Delete User
        </button>
      </div>

      <!-- Form Card -->
      <div class="bg-white shadow rounded-lg p-6">
        <form @submit.prevent="submit">
          <!-- Name -->
          <FormInput
            id="name"
            v-model="form.name"
            label="Full Name"
            type="text"
            placeholder="Enter full name"
            :error="form.errors.name"
            required
          />

          <!-- Email -->
          <FormInput
            id="email"
            v-model="form.email"
            label="Email Address"
            type="email"
            placeholder="Enter email address"
            :error="form.errors.email"
            required
          />

          <!-- Student ID -->
          <FormInput
            id="student_id"
            v-model="form.student_id"
            label="Student ID"
            type="text"
            placeholder="Enter student ID (optional)"
            :error="form.errors.student_id"
          />

          <!-- Role -->
          <FormSelect
            id="role"
            v-model="form.role"
            label="Role"
            :options="roles"
            placeholder="Select a role"
            :error="form.errors.role"
            required
          />

          <!-- Face Status -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Face Registration Status
            </label>
            <div class="flex items-center gap-3">
              <span
                :class="[
                  'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
                  user.has_face ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                ]"
              >
                {{ user.has_face ? 'Face Registered' : 'No Face Data' }}
              </span>
              <button
                v-if="user.has_face"
                type="button"
                @click="openRemoveFaceModal"
                class="text-sm text-red-600 hover:text-red-800 underline"
              >
                Remove Face Data
              </button>
            </div>
          </div>

          <!-- Divider -->
          <div class="border-t border-gray-200 my-6"></div>

          <!-- Password Section -->
          <div class="mb-4">
            <h3 class="text-sm font-medium text-gray-700 mb-2">Change Password (Optional)</h3>
            <p class="text-xs text-gray-500 mb-4">Leave blank to keep current password</p>
          </div>

          <!-- Password -->
          <FormInput
            id="password"
            v-model="form.password"
            label="New Password"
            type="password"
            placeholder="Enter new password"
            :error="form.errors.password"
          />

          <!-- Password Confirmation -->
          <FormInput
            id="password_confirmation"
            v-model="form.password_confirmation"
            label="Confirm New Password"
            type="password"
            placeholder="Confirm new password"
            :error="form.errors.password_confirmation"
          />

          <!-- Actions -->
          <div class="flex items-center justify-end gap-4 mt-6">
            <Link
              :href="route('admin.students.index')"
              class="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150"
            >
              Cancel
            </Link>
            <PrimaryButton :disabled="form.processing">
              Update User
            </PrimaryButton>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <ConfirmModal
      :show="showDeleteModal"
      title="Delete User"
      :message="`Are you sure you want to delete ${user.name}? This action cannot be undone.`"
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
      :message="`Are you sure you want to remove face data for ${user.name}? They will need to re-register their face.`"
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
import { ref } from 'vue';
import { Link, useForm, router } from '@inertiajs/vue3';
import AppLayout from '@/Layouts/AppLayout.vue';
import FormInput from '@/Components/Common/FormInput.vue';
import FormSelect from '@/Components/Common/FormSelect.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import ConfirmModal from '@/Components/Common/ConfirmModal.vue';
import { useToast } from '@/composables/useToast';

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
  roles: {
    type: Array,
    required: true,
  },
});

const toast = useToast();

const form = useForm({
  name: props.user.name,
  email: props.user.email,
  student_id: props.user.student_id || '',
  role: props.user.role,
  password: '',
  password_confirmation: '',
});

const processing = ref(false);
const showDeleteModal = ref(false);
const showRemoveFaceModal = ref(false);

const submit = () => {
  form.put(route('admin.students.update', props.user.id), {
    onSuccess: () => {
      toast.success('User updated successfully');
    },
    onError: (errors) => {
      if (errors.message) {
        toast.error(errors.message);
      } else {
        toast.error('Failed to update user. Please check the form.');
      }
    },
  });
};

// Delete user
const openDeleteModal = () => {
  showDeleteModal.value = true;
};

const closeDeleteModal = () => {
  showDeleteModal.value = false;
};

const confirmDelete = () => {
  processing.value = true;

  router.delete(route('admin.students.destroy', props.user.id), {
    onSuccess: () => {
      toast.success('User deleted successfully');
    },
    onError: (errors) => {
      toast.error(errors.message || 'Failed to delete user');
      processing.value = false;
    },
  });
};

// Remove face
const openRemoveFaceModal = () => {
  showRemoveFaceModal.value = true;
};

const closeRemoveFaceModal = () => {
  showRemoveFaceModal.value = false;
};

const confirmRemoveFace = () => {
  processing.value = true;

  router.delete(route('admin.students.removeFace', props.user.id), {
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
</script>
