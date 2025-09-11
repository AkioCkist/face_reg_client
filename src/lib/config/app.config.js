// Application configuration constants
export const APP_CONFIG = {
  NAME: 'Face Recognition Attendance System',
  VERSION: '1.0.0',
  DESCRIPTION: 'A modern solution for classroom attendance tracking using facial recognition technology',
  
  // Feature flags
  FEATURES: {
    FACE_RECOGNITION: true,
    ATTENDANCE_TRACKING: true,
    USER_MANAGEMENT: true,
    ANALYTICS: true,
    NOTIFICATIONS: true
  },

  // UI Configuration
  UI: {
    THEME: {
      PRIMARY_COLOR: '#3B82F6', // blue-500
      SECONDARY_COLOR: '#6366F1', // indigo-500
      SUCCESS_COLOR: '#10B981', // emerald-500
      WARNING_COLOR: '#F59E0B', // amber-500
      ERROR_COLOR: '#EF4444' // red-500
    },
    ANIMATION_DURATION: 300,
    TOAST_DURATION: 5000
  },

  // Camera settings
  CAMERA: {
    VIDEO_WIDTH: 1280,
    VIDEO_HEIGHT: 720,
    FACING_MODE: 'user',
    FRAME_RATE: 30
  },

  // Face recognition settings
  FACE_RECOGNITION: {
    CONFIDENCE_THRESHOLD: 0.8,
    MAX_RETRIES: 3,
    CAPTURE_DELAY: 1000, // milliseconds
    IMAGE_QUALITY: 0.8
  },

  // Attendance settings
  ATTENDANCE: {
    MARK_WINDOW: 30, // minutes
    AUTO_MARK_ENABLED: true,
    LOCATION_TRACKING: false
  },

  // Pagination
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 10,
    MAX_PAGE_SIZE: 100
  },

  // Local storage keys
  STORAGE_KEYS: {
    AUTH_TOKEN: 'authToken',
    USER_PREFERENCES: 'userPreferences',
    THEME: 'theme',
    LANGUAGE: 'language'
  },

  // User roles
  USER_ROLES: {
    STUDENT: 'student',
    TEACHER: 'teacher',
    ADMIN: 'admin'
  },

  // Routes
  ROUTES: {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    DASHBOARD_STUDENT: '/dashboard_student',
    DASHBOARD_TEACHER: '/dashboard_teacher',
    PROFILE: '/profile',
    ATTENDANCE: '/attendance',
    USERS: '/users'
  }
};

// Environment-specific configurations
export const ENV_CONFIG = {
  DEVELOPMENT: {
    DEBUG: true,
    LOG_LEVEL: 'debug',
    API_TIMEOUT: 30000
  },
  PRODUCTION: {
    DEBUG: false,
    LOG_LEVEL: 'error',
    API_TIMEOUT: 10000
  }
};

export const getCurrentEnvConfig = () => {
  const env = process.env.NODE_ENV || 'development';
  return ENV_CONFIG[env.toUpperCase()] || ENV_CONFIG.DEVELOPMENT;
};
