// User service for handling user profile and management operations
class UserService {
  async getUserProfile(userId) {
    try {
      const token = localStorage.getItem('authToken');
      
      const response = await fetch(`/api/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Get user profile error:', error);
      throw new Error('Failed to fetch user profile');
    }
  }

  async updateUserProfile(userId, userData) {
    try {
      const token = localStorage.getItem('authToken');
      
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userData)
      });
      
      if (!response.ok) {
        throw new Error('Failed to update user profile');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Update user profile error:', error);
      throw new Error('Failed to update user profile');
    }
  }

  async getAllUsers(filters = {}) {
    try {
      const token = localStorage.getItem('authToken');
      const queryParams = new URLSearchParams(filters).toString();
      const url = `/api/users${queryParams ? `?${queryParams}` : ''}`;
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Get all users error:', error);
      throw new Error('Failed to fetch users');
    }
  }

  async getStudents(classId = null) {
    try {
      const token = localStorage.getItem('authToken');
      const url = classId ? `/api/users/students?classId=${classId}` : '/api/users/students';
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch students');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Get students error:', error);
      throw new Error('Failed to fetch students');
    }
  }

  async getTeachers() {
    try {
      const token = localStorage.getItem('authToken');
      
      const response = await fetch('/api/users/teachers', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch teachers');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Get teachers error:', error);
      throw new Error('Failed to fetch teachers');
    }
  }

  async deleteUser(userId) {
    try {
      const token = localStorage.getItem('authToken');
      
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Delete user error:', error);
      throw new Error('Failed to delete user');
    }
  }
}

export default new UserService();
