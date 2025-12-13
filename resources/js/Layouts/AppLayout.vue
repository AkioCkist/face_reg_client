<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <!-- Logo -->
            <div class="flex-shrink-0 flex items-center">
              <Link :href="dashboardRoute" class="text-xl font-bold text-indigo-600">
                Face Recognition System
              </Link>
            </div>

            <!-- Navigation Links -->
            <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                v-for="item in navigationItems"
                :key="item.name"
                :href="item.href"
                :class="[
                  isCurrentRoute(item.href)
                    ? 'border-indigo-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                  'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium',
                ]"
              >
                {{ item.name }}
              </Link>
            </div>
          </div>

          <!-- User Dropdown -->
          <div class="flex items-center">
            <div class="ml-3 relative">
              <div class="flex items-center gap-4">
                <span class="text-sm text-gray-700">{{ user.name }}</span>
                <span class="px-2 py-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-800">
                  {{ roleLabel }}
                </span>
                <Link
                  :href="route('logout')"
                  method="post"
                  as="button"
                  class="text-sm text-gray-700 hover:text-gray-900"
                >
                  Logout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Page Content -->
    <main class="py-10">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <slot />
      </div>
    </main>

    <!-- Toast Notifications -->
    <Toast :toasts="toasts" @remove="removeToast" />
  </div>
</template>

<script setup>
import { computed, provide } from 'vue';
import { Link, usePage } from '@inertiajs/vue3';
import { useToast } from '@/composables/useToast';
import Toast from '@/Components/Common/Toast.vue';
import { USER_ROLES, ROLE_LABELS, ROLE_DASHBOARD_ROUTES } from '@/constants/roles';

const page = usePage();
const user = computed(() => page.props.auth.user);
const userRole = computed(() => user.value.role);

const { toasts, remove: removeToast, success, error, warning, info } = useToast();

// Provide toast methods to child components
provide('toast', { success, error, warning, info });

const roleLabel = computed(() => ROLE_LABELS[userRole.value] || userRole.value);

const dashboardRoute = computed(() => ROLE_DASHBOARD_ROUTES[userRole.value] || '/dashboard');

const navigationItems = computed(() => {
  const role = userRole.value;
  
  if (role === USER_ROLES.ADMIN) {
    return [
      { name: 'Dashboard', href: '/admin/dashboard' },
      { name: 'Faces', href: '/admin/faces' },
      { name: 'Settings', href: '/admin/config' },
    ];
  }
  
  if (role === USER_ROLES.TEACHER) {
    return [
      { name: 'Dashboard', href: '/teacher/dashboard' },
      { name: 'Classes', href: '/teacher/classes' },
      { name: 'Attendance', href: '/teacher/classes/1/attendance' },
    ];
  }
  
  if (role === USER_ROLES.STUDENT) {
    return [
      { name: 'Dashboard', href: '/student/dashboard' },
      { name: 'Profile', href: '/student/profile' },
      { name: 'Attendance', href: '/student/attendance/history' },
    ];
  }
  
  return [];
});

const isCurrentRoute = (href) => {
  return page.url.startsWith(href);
};
</script>
