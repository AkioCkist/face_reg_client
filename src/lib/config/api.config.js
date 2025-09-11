// API configuration constants and endpoints
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  TIMEOUT: 30000, // 30 seconds
  
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      LOGOUT: '/auth/logout',
      REGISTER: '/auth/register',
      ME: '/auth/me',
      REFRESH: '/auth/refresh'
    },
    USERS: {
      PROFILE: '/users',
      LIST: '/users',
      STUDENTS: '/users/students',
      TEACHERS: '/users/teachers',
      UPDATE: '/users',
      DELETE: '/users'
    },
    ATTENDANCE: {
      MARK: '/attendance/mark',
      HISTORY: '/attendance/history',
      STATS: '/attendance/stats',
      UPLOAD_FACE: '/attendance/upload-face',
      VERIFY_FACE: '/attendance/verify-face'
    },
    FACE_RECOGNITION: {
      DETECT: '/face-recognition/detect',
      RECOGNIZE: '/face-recognition/recognize',
      ENROLL: '/face-recognition/enroll',
      VERIFY: '/face-recognition/verify'
    }
  }
};

// HTTP Status codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
};

// Request headers
export const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

export const getFileUploadHeaders = () => {
  const token = localStorage.getItem('authToken');
  return {
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};
