// Attendance service for handling face recognition and attendance tracking
class AttendanceService {
  async markAttendance(faceData) {
    try {
      const token = localStorage.getItem('authToken');
      
      const response = await fetch('/api/attendance/mark', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ faceData })
      });
      
      if (!response.ok) {
        throw new Error('Attendance marking failed');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Mark attendance error:', error);
      throw new Error('Attendance marking failed');
    }
  }

  async getAttendanceHistory(userId, filters = {}) {
    try {
      const token = localStorage.getItem('authToken');
      const queryParams = new URLSearchParams(filters).toString();
      const url = `/api/attendance/history/${userId}${queryParams ? `?${queryParams}` : ''}`;
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch attendance history');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Get attendance history error:', error);
      throw new Error('Failed to fetch attendance history');
    }
  }

  async getAttendanceStats(userId, period = 'month') {
    try {
      const token = localStorage.getItem('authToken');
      
      const response = await fetch(`/api/attendance/stats/${userId}?period=${period}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch attendance statistics');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Get attendance stats error:', error);
      throw new Error('Failed to fetch attendance statistics');
    }
  }

  async uploadFaceImage(imageData) {
    try {
      const token = localStorage.getItem('authToken');
      const formData = new FormData();
      formData.append('faceImage', imageData);
      
      const response = await fetch('/api/attendance/upload-face', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      
      if (!response.ok) {
        throw new Error('Face image upload failed');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Upload face image error:', error);
      throw new Error('Face image upload failed');
    }
  }

  async verifyFace(imageData) {
    try {
      const token = localStorage.getItem('authToken');
      const formData = new FormData();
      formData.append('faceImage', imageData);
      
      const response = await fetch('/api/attendance/verify-face', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      
      if (!response.ok) {
        throw new Error('Face verification failed');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Verify face error:', error);
      throw new Error('Face verification failed');
    }
  }
}

export default new AttendanceService();
