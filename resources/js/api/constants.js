export const API_ROUTES = {
    // Teacher Classes
    TEACHER_CLASSES_INDEX: '/teacher/classes',
    TEACHER_CLASSES_STORE: '/teacher/classes',
    TEACHER_CLASSES_SHOW: (id) => `/teacher/classes/${id}`,
    TEACHER_CLASSES_UPDATE: (id) => `/teacher/classes/${id}`,
    TEACHER_CLASSES_DELETE: (id) => `/teacher/classes/${id}`,
    TEACHER_CLASSES_ADD_STUDENT: (id) => `/teacher/classes/${id}/students`,
    TEACHER_CLASSES_REMOVE_STUDENT: (id, studentId) => `/teacher/classes/${id}/students/${studentId}`,

    // Teacher Attendance
    TEACHER_ATTENDANCE_INDEX: (classId) => `/teacher/classes/${classId}/attendance`,
    TEACHER_ATTENDANCE_MARK: '/teacher/attendance/mark',
    TEACHER_ATTENDANCE_FACE: '/teacher/attendance/face',
    TEACHER_ATTENDANCE_REPORT: (classId) => `/teacher/classes/${classId}/attendance/report`,

    // Teacher Dashboard
    TEACHER_DASHBOARD: '/teacher/dashboard',

    // Student Classes
    STUDENT_CLASSES_INDEX: '/student/classes',
    STUDENT_CLASSES_SHOW: (id) => `/student/classes/${id}`,

    // Student Profile
    STUDENT_PROFILE_INDEX: '/student/profile',
    STUDENT_PROFILE_UPDATE: '/student/profile',

    // Student Attendance
    STUDENT_ATTENDANCE_INDEX: '/student/attendance',
    STUDENT_ATTENDANCE_STATISTICS: '/student/attendance/statistics',
};

export const ATTENDANCE_STATUS = {
    PRESENT: 'present',
    LATE: 'late',
    ABSENT: 'absent',
};

export const ATTENDANCE_STATUS_LABELS = {
    present: 'Present',
    late: 'Late',
    absent: 'Absent',
};

export const DAYS_OF_WEEK = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
];

export const DAYS_OF_WEEK_VN = {
    Monday: 'Monday',
    Tuesday: 'Tuesday',
    Wednesday: 'Wednesday',
    Thursday: 'Thursday',
    Friday: 'Friday',
    Saturday: 'Saturday',
    Sunday: 'Sunday',
};
