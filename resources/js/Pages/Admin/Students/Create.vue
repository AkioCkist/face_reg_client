<template>
  <AppLayout>
    <div class="max-w-2xl mx-auto space-y-6">
      <!-- Header -->
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Create User</h1>
        <p class="mt-2 text-sm text-gray-600">Add a new student or teacher to the system</p>
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

          <!-- Password -->
          <FormInput
            id="password"
            v-model="form.password"
            label="Password"
            type="password"
            placeholder="Enter password"
            :error="form.errors.password"
            required
          />

          <!-- Password Confirmation -->
          <FormInput
            id="password_confirmation"
            v-model="form.password_confirmation"
            label="Confirm Password"
            type="password"
            placeholder="Confirm password"
            :error="form.errors.password_confirmation"
            required
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
              Create User
            </PrimaryButton>
          </div>
        </form>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import { Link, useForm } from '@inertiajs/vue3';
import AppLayout from '@/Layouts/AppLayout.vue';
import FormInput from '@/Components/Common/FormInput.vue';
import FormSelect from '@/Components/Common/FormSelect.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import { useToast } from '@/composables/useToast';

const props = defineProps({
  roles: {
    type: Array,
    required: true,
  },
});

const toast = useToast();

const form = useForm({
  name: '',
  email: '',
  student_id: '',
  role: '',
  password: '',
  password_confirmation: '',
});

const submit = () => {
  form.post(route('admin.students.store'), {
    onSuccess: () => {
      toast.success('User created successfully');
    },
    onError: (errors) => {
      if (errors.message) {
        toast.error(errors.message);
      } else {
        toast.error('Failed to create user. Please check the form.');
      }
    },
  });
};
</script>
