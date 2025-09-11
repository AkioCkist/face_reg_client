// Application constants
export const USER_ROLES = {
  STUDENT: 'student',
  TEACHER: 'teacher',
  ADMIN: 'admin'
};

export const ATTENDANCE_STATUS = {
  PRESENT: 'present',
  ABSENT: 'absent',
  LATE: 'late',
  EXCUSED: 'excused'
};

export const FACE_RECOGNITION_STATUS = {
  SUCCESS: 'success',
  FAILED: 'failed',
  NO_FACE_DETECTED: 'no_face_detected',
  MULTIPLE_FACES: 'multiple_faces',
  LOW_CONFIDENCE: 'low_confidence'
};

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password'
  },
  USERS: {
    GET_ALL: '/users',
    GET_BY_ID: '/users/:id',
    CREATE: '/users',
    UPDATE: '/users/:id',
    DELETE: '/users/:id',
    UPLOAD_AVATAR: '/users/:id/avatar'
  },
  ATTENDANCE: {
    MARK: '/attendance/mark',
    GET_HISTORY: '/attendance/history',
    GET_STATS: '/attendance/stats',
    EXPORT: '/attendance/export'
  },
  FACE_RECOGNITION: {
    ENROLL: '/face-recognition/enroll',
    VERIFY: '/face-recognition/verify',
    DETECT: '/face-recognition/detect',
    DELETE: '/face-recognition/delete'
  }
};

export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE'
};

export const HTTP_STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503
};

export const LOCAL_STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  REFRESH_TOKEN: 'refreshToken',
  USER_DATA: 'userData',
  THEME: 'theme',
  LANGUAGE: 'language',
  PREFERENCES: 'userPreferences'
};

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  DASHBOARD_STUDENT: '/dashboard_student',
  DASHBOARD_TEACHER: '/dashboard_teacher',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  ATTENDANCE: '/attendance',
  USERS: '/users',
  REPORTS: '/reports'
};

export const CAMERA_CONSTRAINTS = {
  VIDEO: {
    width: { ideal: 1280 },
    height: { ideal: 720 },
    facingMode: 'user',
    frameRate: { ideal: 30 }
  },
  AUDIO: false
};

export const FACE_DETECTION_CONFIG = {
  CONFIDENCE_THRESHOLD: 0.8,
  MAX_DETECTIONS: 1,
  INPUT_SIZE: 512,
  SCORE_THRESHOLD: 0.5,
  NMS_THRESHOLD: 0.3
};

export const FILE_TYPES = {
  IMAGES: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
  DOCUMENTS: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  SPREADSHEETS: ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
};

export const FILE_SIZE_LIMITS = {
  AVATAR: 5 * 1024 * 1024, // 5MB
  FACE_IMAGE: 10 * 1024 * 1024, // 10MB
  DOCUMENT: 50 * 1024 * 1024 // 50MB
};

export const PAGINATION_DEFAULTS = {
  PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 25, 50, 100],
  MAX_PAGE_SIZE: 100
};

export const DATE_FORMATS = {
  DISPLAY: 'MMM dd, yyyy',
  INPUT: 'yyyy-MM-dd',
  DATETIME: 'MMM dd, yyyy hh:mm a',
  TIME: 'hh:mm a',
  ISO: "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"
};

export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
};

export const FORM_VALIDATION_MESSAGES = {
  REQUIRED: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PASSWORD: 'Password must be at least 8 characters with uppercase, lowercase and number',
  PASSWORD_MISMATCH: 'Passwords do not match',
  INVALID_PHONE: 'Please enter a valid phone number',
  INVALID_URL: 'Please enter a valid URL',
  MIN_LENGTH: (min) => `Minimum length is ${min} characters`,
  MAX_LENGTH: (max) => `Maximum length is ${max} characters`,
  INVALID_FILE_TYPE: 'Invalid file type',
  FILE_TOO_LARGE: 'File size is too large'
};

export const ATTENDANCE_PERIODS = {
  TODAY: 'today',
  WEEK: 'week',
  MONTH: 'month',
  SEMESTER: 'semester',
  YEAR: 'year'
};

export const CHART_COLORS = {
  PRIMARY: '#3B82F6',
  SECONDARY: '#6366F1',
  SUCCESS: '#10B981',
  WARNING: '#F59E0B',
  ERROR: '#EF4444',
  INFO: '#06B6D4',
  GRAY: '#6B7280'
};
