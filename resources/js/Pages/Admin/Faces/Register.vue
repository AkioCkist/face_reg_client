<template>
  <AppLayout>
    <div class="max-w-4xl mx-auto space-y-6">
      <!-- Header -->
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Register New Face</h1>
        <p class="mt-2 text-sm text-gray-600">Capture and register a new face in the system</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Webcam Panel -->
        <div>
          <WebcamPanel
            title="Capture Face"
            @capture="handleCapture"
            @error="handleWebcamError"
          />
        </div>

        <!-- Form -->
        <div class="bg-white rounded-lg shadow-lg p-6">
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <!-- Student Selection with Search -->
            <div class="relative">
              <label for="student_search" class="block text-sm font-medium text-gray-700">
                Search Student
              </label>
              <div class="mt-1 relative">
                <input
                  id="student_search"
                  v-model="searchQuery"
                  @input="handleSearch"
                  @focus="showSearchResults = true"
                  type="text"
                  placeholder="Search by Student ID, Name, or Email"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                <div v-if="isSearching" class="absolute right-3 top-3">
                  <svg class="animate-spin h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              </div>
              
              <!-- Search Results Dropdown -->
              <div v-if="showSearchResults && (searchResults.length > 0 || searchQuery.length > 0)" 
                   class="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                <div v-if="searchResults.length === 0 && searchQuery.length > 0" class="px-4 py-3 text-sm text-gray-500">
                  No students found
                </div>
                <button
                  v-for="student in searchResults"
                  :key="student.id"
                  @click="selectStudent(student)"
                  type="button"
                  class="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                >
                  <div class="font-medium text-gray-900">{{ student.student_id }} - {{ student.name }}</div>
                  <div class="text-sm text-gray-500">{{ student.email }}</div>
                  <div v-if="student.department" class="text-xs text-gray-400">{{ student.department }}</div>
                </button>
              </div>
              
              <!-- Selected Student Display -->
              <div v-if="selectedStudent" class="mt-2 p-3 bg-gray-50 rounded-md">
                <div class="font-medium text-gray-900">Selected: {{ selectedStudent.student_id }} - {{ selectedStudent.name }}</div>
                <div class="text-sm text-gray-500">{{ selectedStudent.email }}</div>
                <button @click="clearSelection" type="button" class="mt-2 text-xs text-indigo-600 hover:text-indigo-800">
                  Clear Selection
                </button>
              </div>
              
              <p v-if="errors.student_id" class="mt-1 text-sm text-red-600">{{ errors.student_id }}</p>
            </div>



            <!-- Captured Image Preview -->
            <div v-if="form.image">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Captured Image
              </label>
              <img :src="form.image" alt="Captured face" class="w-full rounded-lg" />
            </div>

            <!-- Submit Button -->
            <div class="flex gap-4">
              <button
                type="submit"
                :disabled="!form.image || !form.student_id || isSubmitting"
                class="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {{ isSubmitting ? 'Registering...' : 'Register Face' }}
              </button>
              <Link
                href="/admin/faces"
                class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Loading Overlay -->
    <LoadingOverlay :show="isSubmitting" message="Registering face..." />
  </AppLayout>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { Link, router } from '@inertiajs/vue3';
import axios from 'axios';
import AppLayout from '@/Layouts/AppLayout.vue';
import WebcamPanel from '@/Components/Face/WebcamPanel.vue';
import LoadingOverlay from '@/Components/Common/LoadingOverlay.vue';
import FacesService from '@/services/FacesService';
import { useToast } from '@/composables/useToast';

const props = defineProps({
  students: {
    type: Array,
    required: true,
  },
});

const { success, error } = useToast();

const form = ref({
  student_id: '',
  image: null,
});

const errors = ref({});
const isSubmitting = ref(false);
const searchQuery = ref('');
const searchResults = ref([]);
const isSearching = ref(false);
const showSearchResults = ref(false);

const handleCapture = (imageData) => {
  form.value.image = imageData;
  success('Image captured successfully');
};

const handleWebcamError = (errorMsg) => {
  error(errorMsg);
};

// Student search and selection
const selectedStudent = ref(null);
let searchTimeout = null;

const handleSearch = () => {
  clearTimeout(searchTimeout);
  
  if (searchQuery.value.length < 2) {
    searchResults.value = [];
    showSearchResults.value = false;
    return;
  }

  searchTimeout = setTimeout(async () => {
    isSearching.value = true;
    try {
      const response = await axios.get('/admin/faces/search-students', {
        params: { query: searchQuery.value }
      });
      
      if (response.data.success) {
        searchResults.value = response.data.data;
        showSearchResults.value = true;
      } else {
        searchResults.value = [];
        error('Failed to search students');
      }
    } catch (err) {
      searchResults.value = [];
      error('Error searching students');
    } finally {
      isSearching.value = false;
    }
  }, 300);
};

const selectStudent = (student) => {
  selectedStudent.value = student;
  form.value.student_id = student.student_id;
  searchQuery.value = `${student.student_id} - ${student.name}`;
  showSearchResults.value = false;
  searchResults.value = [];
};

const clearSelection = () => {
  selectedStudent.value = null;
  form.value.student_id = '';
  searchQuery.value = '';
  showSearchResults.value = false;
  searchResults.value = [];
};

// Close search results when clicking outside
const handleClickOutside = (event) => {
  if (!event.target.closest('.relative')) {
    showSearchResults.value = false;
  }
};

// Lifecycle management
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  
  // If there are students passed from props, use them as initial search results
  if (props.students && props.students.length > 0) {
    searchResults.value = props.students.slice(0, 10); // Show first 10 as initial results
  }
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  clearTimeout(searchTimeout);
});

const handleSubmit = async () => {
  if (!form.value.image || !form.value.student_id) {
    error('Please select a student and capture an image');
    return;
  }

  isSubmitting.value = true;
  errors.value = {};

  // Debug logging
  console.log('📤 Submitting face registration:', {
    student_id: form.value.student_id,
    image_length: form.value.image?.length,
    image_preview: form.value.image?.substring(0, 50) + '...'
  });

  try {
    const result = await FacesService.register(form.value);
    
    // If we get here, the request was successful
    success('Face registered successfully');
    router.visit('/admin/faces');
  } catch (err) {
    // Handle the thrown error object from FacesService
    console.error('❌ Face registration error:', err);
    if (err.errors) {
      errors.value = err.errors;
      console.error('Validation errors:', err.errors);
    }
    error(err.message || 'An error occurred while registering the face');
  } finally {
    isSubmitting.value = false;
  }
};
</script>
