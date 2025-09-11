// Attendance related types and interfaces

/**
 * Attendance record structure
 */
export const AttendanceRecord = {
  id: '',
  userId: '',
  classId: '',
  date: '',
  time: '',
  status: '', // 'present' | 'absent' | 'late' | 'excused'
  method: '', // 'face_recognition' | 'manual'
  confidence: 0.0, // Face recognition confidence score
  location: {
    latitude: 0,
    longitude: 0
  },
  createdAt: '',
  updatedAt: ''
};

/**
 * Attendance marking request
 */
export const AttendanceMarkRequest = {
  userId: '',
  classId: '',
  faceData: '', // Base64 encoded image or face features
  location: {
    latitude: 0,
    longitude: 0
  }
};

/**
 * Attendance statistics structure
 */
export const AttendanceStats = {
  totalDays: 0,
  presentDays: 0,
  absentDays: 0,
  lateDays: 0,
  excusedDays: 0,
  attendanceRate: 0.0,
  period: '', // 'week' | 'month' | 'semester' | 'year'
  startDate: '',
  endDate: ''
};

/**
 * Attendance filters for queries
 */
export const AttendanceFilters = {
  userId: '',
  classId: '',
  startDate: '',
  endDate: '',
  status: '', // 'present' | 'absent' | 'late' | 'excused'
  method: '', // 'face_recognition' | 'manual'
  page: 1,
  pageSize: 10
};

/**
 * Attendance report structure
 */
export const AttendanceReport = {
  id: '',
  title: '',
  type: '', // 'daily' | 'weekly' | 'monthly' | 'custom'
  filters: AttendanceFilters,
  data: [], // Array of AttendanceRecord
  statistics: AttendanceStats,
  generatedAt: '',
  generatedBy: ''
};

/**
 * Class/Course structure
 */
export const ClassType = {
  id: '',
  name: '',
  code: '',
  description: '',
  teacherId: '',
  students: [], // Array of student IDs
  schedule: {
    days: [], // ['monday', 'wednesday', 'friday']
    startTime: '',
    endTime: '',
    location: ''
  },
  semester: '',
  year: 0,
  isActive: true,
  createdAt: '',
  updatedAt: ''
};

/**
 * Attendance summary for dashboard
 */
export const AttendanceSummary = {
  todayAttendance: {
    present: 0,
    absent: 0,
    late: 0,
    total: 0
  },
  weeklyTrend: [], // Array of daily attendance counts
  monthlyStats: AttendanceStats,
  recentAttendance: [] // Array of recent AttendanceRecord
};
