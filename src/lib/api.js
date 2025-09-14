const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

class ApiService {
  // Helper method for making requests
  static async makeRequest(endpoint, options = {}) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  }

  // Authentication
  static async login(userId, password) {
    return this.makeRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ userId, password }),
    });
  }

  // Get student dashboard data
  static async getStudentDashboard(studentId) {
    return this.makeRequest(`/student/dashboard/${studentId}`);
  }

  // Get attendance records
  static async getAttendanceRecords(studentId, limit = 10) {
    return this.makeRequest(`/student/attendance/${studentId}?limit=${limit}`);
  }

  // Record attendance
  static async recordAttendance(attendanceData) {
    return this.makeRequest('/attendance/record', {
      method: 'POST',
      body: JSON.stringify(attendanceData),
    });
  }

  // Upload face image
  static async uploadFaceImage(formData) {
    return this.makeRequest('/upload/face', {
      method: 'POST',
      body: formData,
      headers: {}, // Don't set Content-Type for FormData
    });
  }
}

export default ApiService;
