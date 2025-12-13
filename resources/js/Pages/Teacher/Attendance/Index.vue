<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden">
    <div class="flex justify-between items-center p-6 border-b">
      <h2 class="text-2xl font-bold text-gray-900">Attendance: {{ class_data.name }}</h2>
      <span class="text-gray-600">{{ formatDate(currentDate) }}</span>
    </div>

    <div class="p-6">
      <!-- Attendance Tabs -->
      <div class="flex gap-4 mb-6 border-b">
        <button
          @click="activeTab = 'manual'"
          :class="[
            'px-4 py-2 font-medium border-b-2 transition',
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
            'px-4 py-2 font-medium border-b-2 transition',
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
                <th class="px-6 py-3 text-left text-sm font-semibold">Student</th>
                <th class="px-6 py-3 text-left text-sm font-semibold">Email</th>
                <th class="px-6 py-3 text-left text-sm font-semibold">Status</th>
                <th class="px-6 py-3 text-left text-sm font-semibold">Notes</th>
                <th class="px-6 py-3 text-left text-sm font-semibold">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y">
              <tr v-for="student in students" :key="student.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 font-medium">{{ student.name }}</td>
                <td class="px-6 py-4 text-gray-600">{{ student.email }}</td>
                <td class="px-6 py-4">
                  <select
                    v-model="attendanceForm[student.id].status"
                    class="px-3 py-1 border border-gray-300 rounded text-sm"
                  >
                    <option value="present">Có mặt</option>
                    <option value="late">Trễ</option>
                    <option value="absent">Vắng</option>
                  </select>
                </td>
                <td class="px-6 py-4">
                  <input
                    v-model="attendanceForm[student.id].notes"
                    type="text"
                    placeholder="Ghi chú..."
                    class="px-3 py-1 border border-gray-300 rounded text-sm w-full"
                  />
                </td>
                <td class="px-6 py-4">
                  <button
                    @click="submitAttendance(student.id)"
                    :disabled="submitting[student.id]"
                    class="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 disabled:bg-gray-400"
                  >
                    {{ submitting[student.id] ? 'Đang...' : 'Lưu' }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Face Recognition Tab -->
      <div v-if="activeTab === 'face'" class="space-y-4">
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <p class="text-blue-900">
            📷 Take a photo of the student's face. The system will automatically recognize and update attendance.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Webcam Preview -->
          <div>
            <h3 class="text-lg font-semibold mb-3">Camera</h3>
            <video
              ref="videoRef"
              class="w-full bg-black rounded-lg"
              autoplay
              playsinline
              @loadedmetadata="onVideoReady"
            />
            <button
              v-if="!isCameraActive"
              @click="startCamera"
              class="w-full mt-3 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Bật camera
            </button>
            <button
              v-else
              @click="captureImage"
              :disabled="isProcessing"
              class="w-full mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            >
              {{ isProcessing ? 'Đang xử lý...' : 'Chụp ảnh' }}
            </button>
          </div>

          <!-- Result -->
          <div>
            <h3 class="text-lg font-semibold mb-3">Kết quả</h3>
            <div v-if="recognitionResult" class="space-y-3">
              <div class="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p class="font-semibold text-green-900">✓ Nhận diện thành công</p>
                <p class="text-green-800 mt-2">
                  Học sinh: <span class="font-bold">{{ recognitionResult.student_name }}</span>
                </p>
                <p class="text-sm text-green-700 mt-1">
                  Độ chính xác: {{ (recognitionResult.confidence * 100).toFixed(2) }}%
                </p>
              </div>
            </div>
            <div v-else-if="recognitionError" class="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p class="font-semibold text-red-900">✗ Lỗi</p>
              <p class="text-red-800 mt-2">{{ recognitionError }}</p>
            </div>
            <div v-else class="p-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-600">
              Chụp ảnh để bắt đầu nhận diện
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
        status: 'present',
        notes: '',
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

    // Call face recognition API
    const csrfToken = page.props._token || document.querySelector('meta[name="csrf-token"]')?.content;
    const response = await fetch(route('teacher.attendance.face'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': csrfToken,
      },
      body: JSON.stringify({
        class_id: class_data.id,
        image: imageData,
      }),
    });

    const data = await response.json();

    if (data.success) {
      // Check if student data exists in the response
      if (data.data && data.data.student && data.data.student.name) {
        recognitionResult.value = {
          student_name: data.data.student.name,
          confidence: data.data.confidence || 0.95,
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
    recognitionError.value = 'Lỗi trong quá trình nhận diện';
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
</script>
