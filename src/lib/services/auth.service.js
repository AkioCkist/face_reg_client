// Authentication service for handling login, logout, and registration
class AuthService {
  async login(credentials) {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      
      if (!response.ok) {
        throw new Error('Login failed');
      }
      
      const data = await response.json();
      
      // Store token in localStorage (you might want to use a more secure method)
      if (data.token) {
        localStorage.setItem('authToken', data.token);
      }
      
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Login failed');
    }
  }

  async logout() {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      
      localStorage.removeItem('authToken');
    } catch (error) {
      console.error('Logout error:', error);
      // Still remove token even if logout request fails
      localStorage.removeItem('authToken');
    }
  }

  async register(userData) {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      
      if (!response.ok) {
        throw new Error('Registration failed');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Registration error:', error);
      throw new Error('Registration failed');
    }
  }

  async getCurrentUser() {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) return null;

      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        localStorage.removeItem('authToken');
        return null;
      }

      return await response.json();
    } catch (error) {
      console.error('Get current user error:', error);
      localStorage.removeItem('authToken');
      return null;
    }
  }

  getToken() {
    return localStorage.getItem('authToken');
  }

  isAuthenticated() {
    return !!this.getToken();
  }
}

export default new AuthService();
