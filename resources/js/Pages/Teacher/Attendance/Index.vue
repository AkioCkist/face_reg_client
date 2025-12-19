<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden">
    <div class="flex justify-between items-center p-6 border-b">
      <h2 class="text-2xl font-bold text-gray-900">Attendance: {{ class_data.name }}</h2>
      <div class="flex items-center gap-4">
        <span class="text-gray-600">{{ formatDate(currentDate) }}</span>
        <button
          v-if="activeTab === 'manual'"
          @click="saveAllAttendance"
          :disabled="isSavingAll"
          class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 font-medium transition-all duration-200"
        >
          {{ isSavingAll ? 'Saving...' : 'Save Changes' }}
        </button>
      </div>
    </div>

    <div class="p-6">
      <!-- Attendance Tabs -->
      <div class="flex gap-4 mb-6 border-b">
        <button
          @click="activeTab = 'manual'"
          :class="[
            'px-4 py-2 font-medium border-b-2 transition-all duration-200',
            activeTab === 'manual'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          ]"
        >
          Manual Attendance
        </button>
        <button
          @click="activeTab = 'face'"
          :class="[
            'px-4 py-2 font-medium border-b-2 transition-all duration-200',
            activeTab === 'face'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          ]"
        >
          Face Recognition
        </button>
      </div>

      <!-- Manual Attendance Tab -->
      <div v-if="activeTab === 'manual'" class="space-y-4">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-100">
              <tr>
                <th class="px-6 py-3 text-left text-sm font-semibold">Student ID</th>
                <th class="px-6 py-3 text-left text-sm font-semibold">Name</th>
                <th class="px-6 py-3 text-left text-sm font-semibold">Email</th>
                <th class="px-6 py-3 text-left text-sm font-semibold">Status</th>
                <th class="px-6 py-3 text-left text-sm font-semibold">Notes</th>
              </tr>
            </thead>
            <tbody class="divide-y">
              <tr v-for="student in students" :key="student.id" class="hover:bg-gray-50 transition-colors duration-150">
                <td class="px-6 py-4 text-sm font-medium text-gray-600">{{ student.student_id }}</td>
                <td class="px-6 py-4 font-medium">{{ student.name }}</td>
                <td class="px-6 py-4 text-gray-600">{{ student.email }}</td>
                <td class="px-6 py-4">
                  <div class="flex gap-1">
                    <button
                      @click="attendanceForm[student.id].status = 'unknown'"
                      :class="[
                        'px-3 py-1 rounded text-xs font-medium transition-all duration-200',
                        attendanceForm[student.id].status === 'unknown'
                          ? 'bg-gray-400 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      ]"
                    >
                      Unknown
                    </button>
                    <button
                      @click="attendanceForm[student.id].status = 'present'"
                      :class="[
                        'px-3 py-1 rounded text-xs font-medium transition-all duration-200',
                        attendanceForm[student.id].status === 'present'
                          ? 'bg-green-600 text-white'
                          : 'bg-green-50 text-green-700 hover:bg-green-100'
                      ]"
                    >
                      Present
                    </button>
                    <button
                      @click="attendanceForm[student.id].status = 'late'"
                      :class="[
                        'px-3 py-1 rounded text-xs font-medium transition-all duration-200',
                        attendanceForm[student.id].status === 'late'
                          ? 'bg-yellow-600 text-white'
                          : 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100'
                      ]"
                    >
                      Late
                    </button>
                    <button
                      @click="attendanceForm[student.id].status = 'absent'"
                      :class="[
                        'px-3 py-1 rounded text-xs font-medium transition-all duration-200',
                        attendanceForm[student.id].status === 'absent'
                          ? 'bg-red-600 text-white'
                          : 'bg-red-50 text-red-700 hover:bg-red-100'
                      ]"
                    >
                      Absent
                    </button>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <input
                    v-model="attendanceForm[student.id].notes"
                    type="text"
                    placeholder="Add notes..."
                    class="px-3 py-1 border border-gray-300 rounded text-sm w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Face Recognition Tab -->
      <div v-if="activeTab === 'face'" class="space-y-6">
        <div class="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <!-- Camera Section - 3 columns -->
          <div class="lg:col-span-3 space-y-4">
            <!-- Camera Feed -->
            <div class="relative rounded-xl overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 shadow-lg hover:shadow-xl transition-all duration-300">
              <video
                ref="videoRef"
                class="w-full aspect-video bg-black"
                autoplay
                playsinline
                @loadedmetadata="onVideoReady"
              />
              
              <!-- Camera Overlay -->
              <div v-if="isCameraActive" class="absolute inset-0 pointer-events-none">
                <!-- Corner Brackets -->
                <div class="absolute top-8 left-8 w-16 h-16 border-l-4 border-t-4 border-blue-500 opacity-60 rounded-tl-lg"></div>
                <div class="absolute top-8 right-8 w-16 h-16 border-r-4 border-t-4 border-blue-500 opacity-60 rounded-tr-lg"></div>
                <div class="absolute bottom-8 left-8 w-16 h-16 border-l-4 border-b-4 border-blue-500 opacity-60 rounded-bl-lg"></div>
                <div class="absolute bottom-8 right-8 w-16 h-16 border-r-4 border-b-4 border-blue-500 opacity-60 rounded-br-lg"></div>
                
                <!-- Center Guide -->
                <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-64 border-2 border-dashed border-blue-400 rounded-xl opacity-40"></div>
              </div>
              
              <!-- Processing Overlay -->
              <div v-if="isProcessing" class="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center backdrop-blur-sm">
                <div class="text-center space-y-4">
                  <div class="relative w-20 h-20 mx-auto">
                    <div class="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
                    <div class="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
                  </div>
                  <div class="space-y-1">
                    <p class="text-white font-semibold text-lg">Processing Image</p>
                    <p class="text-blue-200 text-sm">Analyzing facial features...</p>
                  </div>
                </div>
              </div>
              
              <!-- Camera Inactive State -->
              <div v-if="!isCameraActive" class="absolute inset-0 flex items-center justify-center">
                <div class="text-center space-y-4">
                  <div class="w-20 h-20 mx-auto bg-slate-700 rounded-full flex items-center justify-center">
                    <svg class="w-10 h-10 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-slate-300 font-medium">Camera Not Active</p>
                    <p class="text-slate-500 text-sm mt-1">Click below to enable camera</p>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Controls -->
            <div class="flex gap-3">
              <button
                v-if="!isCameraActive"
                @click="startCamera"
                class="flex-1 px-5 py-3 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 text-white text-sm font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
                </svg>
                Enable Camera
              </button>
              <button
                v-else
                @click="captureImage"
                :disabled="isProcessing"
                class="flex-1 px-5 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 disabled:from-gray-400 disabled:to-gray-500 text-white text-sm font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:shadow-md transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none disabled:cursor-not-allowed"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
                </svg>
                {{ isProcessing ? 'Processing...' : 'Capture & Recognize' }}
              </button>
            </div>
          </div>

          <!-- Result Panel - 2 columns -->
          <div class="lg:col-span-2 space-y-4">
            <!-- Success Result -->
            <transition
              enter-active-class="transition-all duration-300 ease-out"
              enter-from-class="opacity-0 transform scale-95 translate-y-2"
              enter-to-class="opacity-100 transform scale-100 translate-y-0"
              leave-active-class="transition-all duration-200 ease-in"
              leave-from-class="opacity-100 transform scale-100"
              leave-to-class="opacity-0 transform scale-95"
            >
              <div v-if="recognitionResult" class="bg-gradient-to-br from-emerald-50 to-green-50 border-2 border-emerald-300 rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                <div class="flex items-start gap-3 mb-4">
                  <div class="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center flex-shrink-0 shadow-md">
                    <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div class="flex-1">
                    <p class="font-bold text-emerald-900 text-base">Recognition Successful!</p>
                    <p class="text-sm text-emerald-700 mt-0.5">Auto-marked as Present</p>
                  </div>
                </div>
                
                <div class="bg-white bg-opacity-80 backdrop-blur-sm rounded-lg p-4 space-y-3 shadow-inner">
                  <div>
                    <p class="text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">Student Name</p>
                    <p class="text-base font-bold text-gray-900">{{ recognitionResult.student_name }}</p>
                  </div>
                  <div>
                    <p class="text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Confidence Level</p>
                    <div class="flex items-center gap-3">
                      <div class="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                        <div 
                          class="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 transition-all duration-700 ease-out shadow-sm"
                          :style="{ width: (recognitionResult.confidence * 100) + '%' }"
                        />
                      </div>
                      <span class="text-sm font-bold text-emerald-700 min-w-fit">{{ (recognitionResult.confidence * 100).toFixed(0) }}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </transition>

            <!-- Error Result -->
            <transition
              enter-active-class="transition-all duration-300 ease-out"
              enter-from-class="opacity-0 transform scale-95 translate-y-2"
              enter-to-class="opacity-100 transform scale-100 translate-y-0"
              leave-active-class="transition-all duration-200 ease-in"
              leave-from-class="opacity-100 transform scale-100"
              leave-to-class="opacity-0 transform scale-95"
            >
              <div v-if="recognitionError" class="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-300 rounded-xl p-5 shadow-lg transition-all duration-300">
                <div class="flex items-start gap-3">
                  <div class="w-12 h-12 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center flex-shrink-0 shadow-md">
                    <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div class="flex-1">
                    <p class="font-bold text-red-900 text-base">Recognition Failed</p>
                    <p class="text-sm text-red-700 mt-1 leading-relaxed">{{ recognitionError }}</p>
                    <button 
                      @click="recognitionError = null" 
                      class="mt-3 text-xs font-semibold text-red-600 hover:text-red-700 underline transition-colors duration-200"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            </transition>

            <!-- Initial State -->
            <div v-if="!recognitionResult && !recognitionError" class="bg-gradient-to-br from-gray-50 to-slate-50 border-2 border-gray-200 rounded-xl p-6 shadow-md text-center transition-all duration-300 hover:shadow-lg">
              <div class="w-16 h-16 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center mx-auto mb-4 shadow-inner">
                <svg class="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                </svg>
              </div>
              <p class="text-base font-bold text-gray-900 mb-1">Ready to Scan</p>
              <p class="text-sm text-gray-600">Enable camera and capture a face</p>
            </div>

            <!-- Instructions Card -->
            <div class="bg-blue-50 border border-blue-200 rounded-xl p-4 shadow-sm">
              <div class="flex gap-2 mb-2">
                <svg class="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                </svg>
                <div>
                  <p class="text-sm font-semibold text-blue-900 mb-2">Quick Tips</p>
                  <ul class="text-xs text-blue-800 space-y-1.5">
                    <li class="flex items-start gap-1.5">
                      <span class="text-blue-600 mt-0.5">•</span>
                      <span>Position your face within the guide frame</span>
                    </li>
                    <li class="flex items-start gap-1.5">
                      <span class="text-blue-600 mt-0.5">•</span>
                      <span>Ensure good lighting for better results</span>
                    </li>
                    <li class="flex items-start gap-1.5">
                      <span class="text-blue-600 mt-0.5">•</span>
                      <span>Look directly at the camera</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { usePage } from '@inertiajs/vue3';
import { formatDate } from '@/utils/helpers';

const props = defineProps({
  classData: Object,
  date: String,
  students: Array,
});

const page = usePage();

const class_data = props.classData;
const currentDate = props.date;
const activeTab = ref('manual');

// Manual attendance
const attendanceForm = reactive({});
const submitting = reactive({});
const isSavingAll = ref(false);

// Face recognition
const videoRef = ref(null);
const isCameraActive = ref(false);
const isProcessing = ref(false);
const recognitionResult = ref(null);
const recognitionError = ref(null);

// Initialize attendance form
if (props.students && Array.isArray(props.students)) {
  props.students.forEach(student => {
    if (!attendanceForm[student.id]) {
      attendanceForm[student.id] = {
        status: student.status || 'unknown',
        notes: student.notes || '',
      };
    }
  });
}

const startCamera = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'user' },
      audio: false,
    });
    videoRef.value.srcObject = stream;
    isCameraActive.value = true;
  } catch (error) {
    console.error('Error accessing camera:', error);
    alert('Không thể truy cập camera. Vui lòng kiểm tra quyền truy cập.');
  }
};

const onVideoReady = () => {
  // Video is ready
};

const captureImage = async () => {
  if (!videoRef.value) return;

  try {
    isProcessing.value = true;
    recognitionError.value = null;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = videoRef.value.videoWidth;
    canvas.height = videoRef.value.videoHeight;
    ctx.drawImage(videoRef.value, 0, 0);

    // Get base64 image data and remove the data URI prefix
    const imageDataUrl = canvas.toDataURL('image/jpeg', 0.95);
    const imageData = imageDataUrl.replace(/^data:image\/jpeg;base64,/, '');

    // Get CSRF token from meta tag or Inertia props
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content || page.props.csrf_token;
    
    if (!csrfToken) {
      recognitionError.value = 'Security token not found. Please refresh the page.';
      isProcessing.value = false;
      return;
    }

    // Call face recognition API
    const response = await fetch(route('teacher.attendance.face'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': csrfToken,
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        class_id: class_data.id,
        image: imageData,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Response status:', response.status);
      console.error('Response body:', errorText);
      recognitionError.value = `Server error: ${response.status}`;
      isProcessing.value = false;
      return;
    }

    const data = await response.json();

    if (data.success) {
      // Check if student data exists in the response
      if (data.data && data.data.student && data.data.student.name) {
        const studentId = data.data.student.id;
        const studentName = data.data.student.name;
        const confidence = data.data.confidence || 0.95;
        
        // Update the attendance form for this student
        if (attendanceForm[studentId]) {
          attendanceForm[studentId] = {
            status: 'present',
            notes: `Face recognized at ${new Date().toLocaleTimeString()}`,
          };
        }
        
        recognitionResult.value = {
          student_name: studentName,
          confidence: confidence,
        };
        setTimeout(() => {
          recognitionResult.value = null;
        }, 3000);
      } else {
        recognitionError.value = data.data?.message || 'Face recognition service is not yet implemented';
      }
    } else {
      recognitionError.value = data.message || 'Face not recognized';
    }
  } catch (error) {
    console.error('Error:', error);
    recognitionError.value = 'Error during face recognition';
  } finally {
    isProcessing.value = false;
  }
};

const submitAttendance = async (studentId) => {
  try {
    submitting[studentId] = true;
    const data = attendanceForm[studentId];

    const response = await fetch(route('teacher.attendance.mark'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
      },
      body: JSON.stringify({
        class_id: class_data.id,
        student_id: studentId,
        status: data.status,
        method: 'manual',
        notes: data.notes,
      }),
    });

    const result = await response.json();
    if (result.message) {
      alert(result.message);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error saving attendance');
  } finally {
    submitting[studentId] = false;
  }
};

const saveAllAttendance = async () => {
  try {
    isSavingAll.value = true;
    
    // Collect all attendance records
    const attendanceRecords = props.students.map(student => ({
      student_id: student.id,
      status: attendanceForm[student.id]?.status || 'unknown',
      method: 'manual',
      notes: attendanceForm[student.id]?.notes || '',
    }));

    const response = await fetch(route('teacher.attendance.mark-all'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
      },
      body: JSON.stringify({
        class_id: class_data.id,
        date: currentDate,
        attendances: attendanceRecords,
      }),
    });

    const result = await response.json();
    
    if (response.ok && result.success) {
      alert('Attendance saved successfully!');
      // Optionally redirect or refresh
      window.location.reload();
    } else {
      alert(result.message || 'Error saving attendance');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error saving attendance: ' + error.message);
  } finally {
    isSavingAll.value = false;
  }
};
</script>