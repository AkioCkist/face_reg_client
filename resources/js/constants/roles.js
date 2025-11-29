// User Role Constants
// Must match Laravel UserRole enum

export const USER_ROLES = {
    ADMIN: 'admin',
    TEACHER: 'teacher',
    STUDENT: 'student',
};

export const ROLE_LABELS = {
    [USER_ROLES.ADMIN]: 'Administrator',
    [USER_ROLES.TEACHER]: 'Teacher',
    [USER_ROLES.STUDENT]: 'Student',
};

export const ROLE_DASHBOARD_ROUTES = {
    [USER_ROLES.ADMIN]: '/admin/dashboard',
    [USER_ROLES.TEACHER]: '/teacher/dashboard',
    [USER_ROLES.STUDENT]: '/student/dashboard',
};

/**
 * Check if user has admin role
 */
export const isAdmin = (role) => role === USER_ROLES.ADMIN;

/**
 * Check if user has teacher role
 */
export const isTeacher = (role) => role === USER_ROLES.TEACHER;

/**
 * Check if user has student role
 */
export const isStudent = (role) => role === USER_ROLES.STUDENT;

/**
 * Check if user can manage faces
 */
export const canManageFaces = (role) => {
    return [USER_ROLES.ADMIN, USER_ROLES.TEACHER].includes(role);
};

/**
 * Check if user can take attendance
 */
export const canTakeAttendance = (role) => {
    return [USER_ROLES.ADMIN, USER_ROLES.TEACHER].includes(role);
};

export default USER_ROLES;
