// Authentication related types and interfaces

/**
 * User object structure
 */
export const UserType = {
  id: '',
  email: '',
  firstName: '',
  lastName: '',
  role: '', // 'student' | 'teacher' | 'admin'
  avatar: '',
  isActive: true,
  createdAt: '',
  updatedAt: ''
};

/**
 * Login credentials structure
 */
export const LoginCredentials = {
  email: '',
  password: ''
};

/**
 * Registration data structure
 */
export const RegisterData = {
  email: '',
  password: '',
  confirmPassword: '',
  firstName: '',
  lastName: '',
  role: '' // 'student' | 'teacher'
};

/**
 * Authentication response structure
 */
export const AuthResponse = {
  success: true,
  user: UserType,
  token: '',
  refreshToken: '',
  expiresIn: 0
};

/**
 * Password reset request structure
 */
export const PasswordResetRequest = {
  email: ''
};

/**
 * Password reset data structure
 */
export const PasswordResetData = {
  token: '',
  newPassword: '',
  confirmPassword: ''
};

/**
 * Auth state structure for hooks/context
 */
export const AuthState = {
  user: null, // UserType | null
  isAuthenticated: false,
  loading: false,
  error: null
};

// Role-based permissions
export const USER_PERMISSIONS = {
  student: {
    canMarkAttendance: true,
    canViewOwnAttendance: true,
    canViewOwnProfile: true,
    canUpdateOwnProfile: true
  },
  teacher: {
    canMarkAttendance: true,
    canViewAllAttendance: true,
    canManageStudents: true,
    canGenerateReports: true,
    canViewOwnProfile: true,
    canUpdateOwnProfile: true
  },
  admin: {
    canManageUsers: true,
    canManageSystem: true,
    canViewAllData: true,
    canGenerateReports: true,
    canManagePermissions: true
  }
};
