export const API_ENDPOINTS = {
  // Admin - Dashboard
  admin: {
    dashboard: '/admin/dashboard',
  },

  // Admin - Students
  students: {
    index: '/admin/students',
    create: '/admin/students/create',
    store: '/admin/students',
    edit: (id) => `/admin/students/${id}/edit`,
    update: (id) => `/admin/students/${id}`,
    destroy: (id) => `/admin/students/${id}`,
    removeFace: (id) => `/admin/students/${id}/face`,
  },

  // Admin - Faces
  faces: {
    index: '/admin/faces',
    create: '/admin/faces/create',
    store: '/admin/faces',
    edit: (id) => `/admin/faces/${id}/edit`,
    update: (id) => `/admin/faces/${id}`,
    destroy: (id) => `/admin/faces/${id}`,
    search: '/admin/faces/search',
    searchStudents: '/admin/faces/search-students',
  },

  // Teacher - Attendance
  teacher: {
    dashboard: '/teacher/dashboard',
    attendance: {
      start: '/teacher/attendance/start',
      recognize: '/teacher/attendance/recognize',
      history: '/teacher/attendance/history',
      stats: '/teacher/attendance/stats',
      export: '/teacher/attendance/export',
    },
  },

  // Student - Profile & Attendance
  student: {
    dashboard: '/student/dashboard',
    profile: {
      show: '/student/profile',
      update: '/student/profile',
      registerFace: '/student/profile/face',
      updateFace: (faceId) => `/student/profile/face/${faceId}`,
    },
    attendance: {
      history: '/student/attendance/history',
      stats: '/student/attendance/stats',
      export: '/student/attendance/export',
    },
  },
};

export default API_ENDPOINTS;
