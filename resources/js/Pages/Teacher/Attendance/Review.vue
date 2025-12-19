<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden">
    <div class="flex justify-between items-center p-6 border-b">
      <div>
        <h2 class="text-2xl font-bold text-gray-900">Review Attendance Session</h2>
        <p class="text-sm text-gray-600 mt-1">{{ class_data.name }} - {{ formatDate(date) }}</p>
      </div>
      <div class="flex gap-3">
        <button
          @click="goBack"
          class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
        >
          Back to Scanning
        </button>
        <button
          @click="saveAttendance"
          :disabled="isSaving"
          class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400"
        >
          {{ isSaving ? 'Saving...' : 'Save Attendance' }}
        </button>
      </div>
    </div>

    <div class="p-6">
      <!-- Summary -->
      <div class="grid grid-cols-3 gap-4 mb-6">
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p class="text-sm text-blue-700">Total Students</p>
          <p class="text-2xl font-bold text-blue-900">{{ totalStudents }}</p>
        </div>
        <div class="bg-green-50 border border-green-200 rounded-lg p-4">
          <p class="text-sm text-green-700">Scanned</p>
          <p class="text-2xl font-bold text-green-900">{{ scannedCount }}</p>
        </div>
        <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p class="text-sm text-yellow-700">Not Scanned</p>
          <p class="text-2xl font-bold text-yellow-900">{{ notScannedCount }}</p>
        </div>
      </div>

      <!-- Attendance Table -->
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-100">
            <tr>
              <th class="px-6 py-3 text-left text-sm font-semibold">Student</th>
              <th class="px-6 py-3 text-left text-sm font-semibold">Email</th>
              <th class="px-6 py-3 text-left text-sm font-semibold">Status</th>
              <th class="px-6 py-3 text-left text-sm font-semibold">Method</th>
              <th class="px-6 py-3 text-left text-sm font-semibold">Confidence</th>
              <th class="px-6 py-3 text-left text-sm font-semibold">Notes</th>
              <th class="px-6 py-3 text-left text-sm font-semibold">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y">
            <tr
              v-for="record in attendanceRecords"
              :key="record.student_id"
              :class="[
                'hover:bg-gray-50',
                record.status === 'present' ? 'bg-green-50' : 
                record.status === 'absent' ? 'bg-red-50' : 
                'bg-yellow-50'
              ]"
            >
              <td class="px-6 py-4 font-medium">{{ record.student_name }}</td>
              <td class="px-6 py-4 text-gray-600 text-sm">{{ record.student_email }}</td>
              <td class="px-6 py-4">
                <select
                  v-model="record.status"
                  class="px-3 py-1 border border-gray-300 rounded text-sm"
                >
                  <option value="present">Có mặt</option>
                  <option value="late">Trễ</option>
                  <option value="absent">Vắng</option>
                </select>
              </td>
              <td class="px-6 py-4">
                <span
                  :class="[
                    'px-2 py-1 rounded text-xs font-medium',
                    record.method === 'face' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-gray-100 text-gray-800'
                  ]"
                >
                  {{ record.method === 'face' ? '📷 Face' : '✏️ Manual' }}
                </span>
              </td>
              <td class="px-6 py-4 text-sm text-gray-600">
                <span v-if="record.confidence">
                  {{ (record.confidence * 100).toFixed(1) }}%
                </span>
                <span v-else>-</span>
              </td>
              <td class="px-6 py-4">
                <input
                  v-model="record.notes"
                  type="text"
                  placeholder="Add notes..."
                  class="px-3 py-1 border border-gray-300 rounded text-sm w-full"
                />
              </td>
              <td class="px-6 py-4">
                <button
                  v-if="record.method === 'auto-absent'"
                  @click="removeRecord(record.student_id)"
                  class="text-red-600 hover:text-red-800 text-sm"
                >
                  Remove
                </button>
                <span v-else class="text-gray-400 text-sm">-</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Actions for missing students -->
      <div v-if="notScannedCount > 0" class="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p class="text-yellow-900 font-medium mb-2">
          {{ notScannedCount }} student(s) were not scanned
        </p>
        <label class="flex items-center gap-2">
          <input
            v-model="markAbsentAutomatically"
            type="checkbox"
            class="rounded"
          />
          <span class="text-sm text-yellow-800">
            Automatically mark unscanned students as absent
          </span>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { router } from '@inertiajs/vue3';
import { formatDate } from '@/utils/helpers';

const props = defineProps({
  classData: Object,
  date: String,
  scannedStudents: Array,
  allStudents: Array,
});

const class_data = props.classData;
const date = props.date;
const isSaving = ref(false);
const markAbsentAutomatically = ref(false);

// Build attendance records
const attendanceRecords = ref([]);

onMounted(() => {
  // Create a map of scanned students
  const scannedMap = new Map(
    props.scannedStudents.map(s => [s.student_id, s])
  );

  // Build records for all students
  attendanceRecords.value = props.allStudents.map(student => {
    const scanned = scannedMap.get(student.id);
    
    if (scanned) {
      // Student was scanned
      return {
        student_id: student.id,
        student_name: student.name,
        student_email: student.email,
        status: scanned.status || 'present',
        method: scanned.method || 'face',
        confidence: scanned.confidence,
        notes: scanned.notes || '',
      };
    } else {
      // Student not scanned - default to absent
      return {
        student_id: student.id,
        student_name: student.name,
        student_email: student.email,
        status: 'absent',
        method: 'auto-absent',
        confidence: null,
        notes: 'Not scanned',
      };
    }
  });
});

const totalStudents = computed(() => props.allStudents.length);
const scannedCount = computed(() => props.scannedStudents.length);
const notScannedCount = computed(() => totalStudents.value - scannedCount.value);

const removeRecord = (studentId) => {
  const record = attendanceRecords.value.find(r => r.student_id === studentId);
  if (record && record.method === 'auto-absent') {
    // Don't remove, just change status to prevent saving
    record.excluded = true;
  }
};

const goBack = () => {
  router.get(route('teacher.attendance.index', class_data.id));
};

const saveAttendance = async () => {
  try {
    isSaving.value = true;

    // Filter records based on settings
    let recordsToSave = attendanceRecords.value.filter(r => !r.excluded);
    
    if (!markAbsentAutomatically.value) {
      // Exclude auto-absent records
      recordsToSave = recordsToSave.filter(r => r.method !== 'auto-absent');
    }

    // Send to backend
    router.post(route('teacher.attendance.save-session', class_data.id), {
      date: date,
      attendance_records: recordsToSave,
    }, {
      onSuccess: () => {
        // Redirect back to classes list or show success message
        alert('Attendance saved successfully!');
        router.get(route('teacher.classes.index'));
      },
      onError: (errors) => {
        console.error('Save errors:', errors);
        alert('Error saving attendance. Please try again.');
      },
      onFinish: () => {
        isSaving.value = false;
      }
    });
  } catch (error) {
    console.error('Error:', error);
    alert('Error saving attendance');
    isSaving.value = false;
  }
};
</script>
