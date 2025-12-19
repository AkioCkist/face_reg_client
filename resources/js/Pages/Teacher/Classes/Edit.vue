<template>
  <div>
    <Link href="/teacher/classes" class="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      Back to Classes
    </Link>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h1 class="text-3xl font-bold text-gray-900 mb-6">
        Edit Class: {{ classItem.name }}
      </h1>

      <form @submit.prevent="submitForm">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <!-- Name -->
          <div>
            <label for="name" class="block text-sm font-medium text-gray-900 mb-2">
              Class Name <span class="text-red-500">*</span>
            </label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              placeholder="e.g., Class 12A1"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name }}</p>
          </div>

          <!-- Code -->
          <div>
            <label for="code" class="block text-sm font-medium text-gray-900 mb-2">
              Class Code <span class="text-red-500">*</span>
            </label>
            <input
              id="code"
              v-model="form.code"
              type="text"
              placeholder="e.g., 12A1"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <p v-if="errors.code" class="text-red-500 text-sm mt-1">{{ errors.code }}</p>
          </div>

          <!-- Room -->
          <div>
            <label for="room" class="block text-sm font-medium text-gray-900 mb-2">
              Classroom
            </label>
            <input
              id="room"
              v-model="form.room"
              type="text"
              placeholder="e.g., 301"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <!-- Day of Week -->
          <div>
            <label for="day" class="block text-sm font-medium text-gray-900 mb-2">
              Day of Week
            </label>
            <select
              id="day"
              v-model="form.day_of_week"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="">-- Select Day --</option>
              <option v-for="day in days" :key="day" :value="day">
                {{ getDayVN(day) }}
              </option>
            </select>
          </div>

          <!-- Start Time -->
          <div>
            <label for="start_time" class="block text-sm font-medium text-gray-900 mb-2">
              Start Time
            </label>
            <input
              id="start_time"
              v-model="form.start_time"
              type="time"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <!-- End Time -->
          <div>
            <label for="end_time" class="block text-sm font-medium text-gray-900 mb-2">
              End Time
            </label>
            <input
              id="end_time"
              v-model="form.end_time"
              type="time"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <!-- Description -->
        <div class="mb-6">
          <label for="description" class="block text-sm font-medium text-gray-900 mb-2">
            Description
          </label>
          <textarea
            id="description"
            v-model="form.description"
            rows="4"
            placeholder="Detailed description about the class..."
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        <!-- Buttons -->
        <div class="flex gap-4">
          <button
            type="submit"
            :disabled="processing"
            class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition"
          >
            {{ processing ? 'Saving...' : 'Save Changes' }}
          </button>
          <Link
            v-if="classItem && classItem.id"
            :href="route('teacher.classes.show', classItem.id)"
            class="px-6 py-2 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 transition"
          >
            Cancel
          </Link>
        </div>
      </form>

      <!-- Student Management Section -->
      <div class="mt-12 border-t pt-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Student Management</h2>
        
        <!-- Search and Add Student -->
        <div class="mb-8 p-4 bg-gray-50 rounded-lg">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Add Student to Class</h3>
          <div class="mb-4">
            <div class="flex-1 relative">
              <input
                v-model="studentSearch"
                type="text"
                placeholder="Search by student ID or name..."
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                @input="searchStudents"
                @focus="isSearchFocused = true"
                @blur="isSearchFocused = false"
              />
              <!-- Search Results Dropdown -->
              <div
                v-if="isSearchFocused && studentSearch.trim() && (searchResults.length > 0 || errorMessage)"
                class="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-64 overflow-y-auto"
              >
                <div v-if="searchResults.length > 0">
                  <div
                    v-for="student in searchResults"
                    :key="student.id"
                    class="px-4 py-3 hover:bg-blue-50 border-b last:border-b-0 flex items-center gap-3 cursor-pointer"
                    @mousedown.prevent="toggleStudentSelection(student)"
                  >
                    <input
                      type="checkbox"
                      :checked="isStudentSelected(student.id)"
                      class="w-4 h-4 text-blue-600 rounded cursor-pointer"
                      @mousedown.prevent.stop="toggleStudentSelection(student)"
                    />
                    <div class="flex-1">
                      <div class="font-medium text-gray-900">{{ student.name }}</div>
                      <div class="text-sm text-gray-600">ID: {{ student.student_id }}</div>
                    </div>
                  </div>
                </div>
                <div v-else class="px-4 py-3 text-sm text-gray-600 text-center">
                  No students found
                </div>
              </div>
            </div>
          </div>

          <!-- Selected Students List -->
          <div v-if="selectedStudents.length > 0" class="mb-4 p-3 bg-blue-50 border border-blue-200 rounded">
            <div class="flex justify-between items-center mb-2">
              <h4 class="font-semibold text-gray-900">Selected Students ({{ selectedStudents.length }})</h4>
              <button
                type="button"
                @click="clearAllSelectedStudents"
                class="text-sm text-blue-600 hover:text-blue-800"
              >
                Clear All
              </button>
            </div>
            <div class="space-y-2">
              <div
                v-for="student in selectedStudents"
                :key="student.id"
                class="flex items-center justify-between p-2 bg-white rounded border border-blue-100"
              >
                <div>
                  <div class="font-medium text-gray-900">{{ student.name }}</div>
                  <div class="text-sm text-gray-600">ID: {{ student.student_id }}</div>
                </div>
                <button
                  type="button"
                  @click="removeStudentSelection(student.id)"
                  class="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>

          <!-- Add Button -->
          <button
            v-if="selectedStudents.length > 0"
            type="button"
            :disabled="addingStudent"
            @click="addStudentsToClass"
            class="w-full px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition font-medium"
          >
            {{ addingStudent ? 'Adding Students...' : `Add ${selectedStudents.length} Student${selectedStudents.length > 1 ? 's' : ''}` }}
          </button>

          <!-- Messages -->
          <div v-if="successMessage" class="mt-3 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            {{ successMessage }}
          </div>
          <div v-if="errorMessage" class="mt-3 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {{ errorMessage }}
          </div>
        </div>

        <!-- Current Students List -->
        <div v-if="classStudents.length > 0" class="mb-8">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Current Students ({{ classStudents.length }})</h3>
          <div class="overflow-x-auto bg-white rounded-lg shadow">
            <table class="w-full">
              <thead class="bg-gray-100 border-b">
                <tr>
                  <th class="px-6 py-3 text-left text-sm font-semibold text-gray-900">Student ID</th>
                  <th class="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                  <th class="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
                  <th class="px-6 py-3 text-right text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="student in classStudents" :key="student.id" class="border-b hover:bg-gray-50 transition">
                  <td class="px-6 py-4 text-sm text-gray-600">{{ student.student_id }}</td>
                  <td class="px-6 py-4 text-sm text-gray-900 font-medium">{{ student.name }}</td>
                  <td class="px-6 py-4 text-sm text-gray-600">{{ student.email }}</td>
                  <td class="px-6 py-4 text-right">
                    <button
                      type="button"
                      @click="removeStudentFromClass(student.id)"
                      :disabled="removingStudent === student.id"
                      class="px-4 py-1 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700 disabled:bg-gray-400 transition"
                    >
                      {{ removingStudent === student.id ? 'Removing...' : 'Remove' }}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div v-else class="mb-8 p-4 bg-gray-50 rounded-lg text-center">
          <p class="text-gray-600">No students in this class yet.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, reactive } from 'vue';
import { Link, useForm, usePage } from '@inertiajs/vue3';
import { DAYS_OF_WEEK, DAYS_OF_WEEK_VN } from '@/api/constants';
import axios from 'axios';

const page = usePage();
const props = defineProps({
  classData: {
    type: Object,
    required: true,
  },
  students: {
    type: Array,
    default: () => [],
  },
});

const classItem = computed(() => props.classData?.data || props.classData);
const classStudents = ref(props.students || []);
const days = DAYS_OF_WEEK;

// Create reactive form object
const form = reactive({
  name: '',
  code: '',
  description: '',
  room: '',
  start_time: '',
  end_time: '',
  day_of_week: '',
});

// Use Inertia's useForm for submission handling
const { errors, processing, put } = useForm({
  name: '',
  code: '',
  description: '',
  room: '',
  start_time: '',
  end_time: '',
  day_of_week: '',
});

// Student management state
const studentSearch = ref('');
const searchResults = ref([]);
const selectedStudents = ref([]);
const addingStudent = ref(false);
const removingStudent = ref(null);
const successMessage = ref('');
const errorMessage = ref('');
const searchTimeout = ref(null);
const isSearchFocused = ref(false);

// Initialize form data when classData prop is available
watch(() => props.classData, (newClassData) => {
  const newClass = newClassData?.data || newClassData;
  if (newClass && newClass.id) {
    form.name = newClass.name || '';
    form.code = newClass.code || '';
    form.description = newClass.description || '';
    form.room = newClass.room || '';
    form.start_time = newClass.start_time ? newClass.start_time.substring(0, 5) : '';
    form.end_time = newClass.end_time ? newClass.end_time.substring(0, 5) : '';
    form.day_of_week = newClass.day_of_week || '';
  }
}, { immediate: true, deep: true });

const getDayVN = (day) => DAYS_OF_WEEK_VN[day] || day;

const submitForm = () => {
  if (classItem.value && classItem.value.id) {
    put(route('teacher.classes.update', classItem.value.id), {
      name: form.name,
      code: form.code,
      description: form.description,
      room: form.room,
      start_time: form.start_time,
      end_time: form.end_time,
      day_of_week: form.day_of_week,
    });
  }
};

// Search students with debounce
const searchStudents = () => {
  clearTimeout(searchTimeout.value);
  
  if (!studentSearch.value.trim()) {
    searchResults.value = [];
    errorMessage.value = '';
    return;
  }

  errorMessage.value = '';
  
  searchTimeout.value = setTimeout(async () => {
    try {
      const response = await axios.get(
        `/api/students/search?query=${encodeURIComponent(studentSearch.value)}`
      );
      searchResults.value = response.data.data || [];
      
      if (searchResults.value.length === 0) {
        errorMessage.value = 'No students found matching your search.';
      }
    } catch (error) {
      console.error('Error searching students:', error);
      searchResults.value = [];
      errorMessage.value = 'Error searching for students. Please try again.';
    }
  }, 300);
};

// Select/Deselect a student from search results
const toggleStudentSelection = (student) => {
  const index = selectedStudents.value.findIndex(s => s.id === student.id);
  if (index > -1) {
    selectedStudents.value.splice(index, 1);
  } else {
    selectedStudents.value.push(student);
  }
};

// Check if a student is selected
const isStudentSelected = (studentId) => {
  return selectedStudents.value.some(s => s.id === studentId);
};

// Remove student from selection
const removeStudentSelection = (studentId) => {
  selectedStudents.value = selectedStudents.value.filter(s => s.id !== studentId);
};

// Clear all selected students
const clearAllSelectedStudents = () => {
  selectedStudents.value = [];
};

// Add students to class
const addStudentsToClass = async () => {
  if (selectedStudents.value.length === 0 || !classItem.value || !classItem.value.id) {
    errorMessage.value = 'Class information is not available';
    return;
  }

  addingStudent.value = true;
  successMessage.value = '';
  errorMessage.value = '';

  try {
    // Store the selected students before clearing
    const studentsToAdd = [...selectedStudents.value];
    const classId = classItem.value.id;
    
    // Add each student to the class
    const promises = studentsToAdd.map(student =>
      axios.post(
        `/teacher/classes/${classId}/students`,
        {
          student_id: student.id,
        }
      )
    );

    await Promise.all(promises);
    
    // Add students to the local list
    classStudents.value = [
      ...classStudents.value,
      ...studentsToAdd,
    ];
    
    const count = studentsToAdd.length;
    successMessage.value = `${count} student${count > 1 ? 's' : ''} added to the class successfully`;
    selectedStudents.value = [];
    studentSearch.value = '';
    searchResults.value = [];
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      successMessage.value = '';
    }, 3000);
  } catch (error) {
    console.error('Error adding students:', error);
    if (error.response?.data?.message) {
      errorMessage.value = error.response.data.message;
    } else {
      errorMessage.value = 'An error occurred while adding students to the class';
    }
  } finally {
    addingStudent.value = false;
  }
};

// Remove student from class
const removeStudentFromClass = async (studentId) => {
  if (!classItem.value || !classItem.value.id) {
    errorMessage.value = 'Class information is not available';
    return;
  }

  removingStudent.value = studentId;
  successMessage.value = '';
  errorMessage.value = '';

  try {
    await axios.delete(
      `/teacher/classes/${classItem.value.id}/students/${studentId}`
    );
    
    // Remove student from the list
    classStudents.value = classStudents.value.filter(s => s.id !== studentId);
    successMessage.value = 'Student removed from class successfully';
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      successMessage.value = '';
    }, 3000);
  } catch (error) {
    console.error('Error removing student:', error);
    if (error.response?.data?.message) {
      errorMessage.value = error.response.data.message;
    } else {
      errorMessage.value = 'An error occurred while removing the student from the class';
    }
  } finally {
    removingStudent.value = null;
  }
};
</script>
