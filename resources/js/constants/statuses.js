// Attendance Status Constants
// Must match Laravel AttendanceStatus enum

export const ATTENDANCE_STATUS = {
    PRESENT: 'present',
    ABSENT: 'absent',
    LATE: 'late',
    EXCUSED: 'excused',
};

export const STATUS_LABELS = {
    [ATTENDANCE_STATUS.PRESENT]: 'Present',
    [ATTENDANCE_STATUS.ABSENT]: 'Absent',
    [ATTENDANCE_STATUS.LATE]: 'Late',
    [ATTENDANCE_STATUS.EXCUSED]: 'Excused',
};

export const STATUS_COLORS = {
    [ATTENDANCE_STATUS.PRESENT]: 'success',
    [ATTENDANCE_STATUS.ABSENT]: 'danger',
    [ATTENDANCE_STATUS.LATE]: 'warning',
    [ATTENDANCE_STATUS.EXCUSED]: 'info',
};

export const STATUS_HEX_COLORS = {
    [ATTENDANCE_STATUS.PRESENT]: '#10b981',
    [ATTENDANCE_STATUS.ABSENT]: '#ef4444',
    [ATTENDANCE_STATUS.LATE]: '#f59e0b',
    [ATTENDANCE_STATUS.EXCUSED]: '#3b82f6',
};

export const STATUS_ICONS = {
    [ATTENDANCE_STATUS.PRESENT]: 'check-circle',
    [ATTENDANCE_STATUS.ABSENT]: 'x-circle',
    [ATTENDANCE_STATUS.LATE]: 'clock',
    [ATTENDANCE_STATUS.EXCUSED]: 'information-circle',
};

/**
 * Check if status counts as attended
 */
export const isAttended = (status) => {
    return [ATTENDANCE_STATUS.PRESENT, ATTENDANCE_STATUS.LATE].includes(status);
};

export default ATTENDANCE_STATUS;
