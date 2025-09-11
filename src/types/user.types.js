// User management related types and interfaces

/**
 * Extended user profile structure
 */
export const UserProfile = {
  id: '',
  email: '',
  firstName: '',
  lastName: '',
  displayName: '',
  avatar: '',
  role: '', // 'student' | 'teacher' | 'admin'
  isActive: true,
  lastLoginAt: '',
  createdAt: '',
  updatedAt: '',
  
  // Contact information
  phone: '',
  address: {
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  },
  
  // Student specific fields
  studentId: '',
  classIds: [], // Array of class IDs student is enrolled in
  grade: '',
  
  // Teacher specific fields
  employeeId: '',
  department: '',
  classesTeaching: [], // Array of class IDs teacher is teaching
  
  // Face recognition data
  faceEnrolled: false,
  faceEnrollmentDate: '',
  
  // Preferences
  preferences: {
    language: 'en',
    timezone: '',
    notifications: {
      email: true,
      push: true,
      attendance: true
    }
  }
};

/**
 * User creation request
 */
export const CreateUserRequest = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  role: '',
  phone: '',
  studentId: '', // For students
  employeeId: '', // For teachers
  classIds: [] // Classes to enroll/assign
};

/**
 * User update request
 */
export const UpdateUserRequest = {
  firstName: '',
  lastName: '',
  phone: '',
  address: {
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  },
  preferences: {
    language: 'en',
    timezone: '',
    notifications: {
      email: true,
      push: true,
      attendance: true
    }
  }
};

/**
 * User filters for search and listing
 */
export const UserFilters = {
  role: '', // 'student' | 'teacher' | 'admin'
  isActive: null, // true | false | null
  classId: '',
  search: '', // Search in name, email
  sortBy: 'createdAt', // 'name' | 'email' | 'createdAt' | 'lastLoginAt'
  sortOrder: 'desc', // 'asc' | 'desc'
  page: 1,
  pageSize: 10
};

/**
 * User list response structure
 */
export const UserListResponse = {
  users: [], // Array of UserProfile
  pagination: {
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 0,
    hasNext: false,
    hasPrevious: false
  },
  filters: UserFilters
};

/**
 * Student enrollment structure
 */
export const StudentEnrollment = {
  studentId: '',
  classId: '',
  enrollmentDate: '',
  status: 'active', // 'active' | 'inactive' | 'graduated'
  grade: ''
};

/**
 * Teacher assignment structure
 */
export const TeacherAssignment = {
  teacherId: '',
  classId: '',
  assignmentDate: '',
  role: 'primary', // 'primary' | 'assistant'
  status: 'active' // 'active' | 'inactive'
};

/**
 * User dashboard data structure
 */
export const UserDashboardData = {
  user: UserProfile,
  stats: {
    totalClasses: 0,
    attendanceRate: 0.0,
    recentActivity: [] // Array of recent activities
  },
  upcomingClasses: [], // Array of upcoming classes
  notifications: [], // Array of notifications
  quickActions: [] // Array of available actions
};
