import pkg from 'pg';
const { Pool } = pkg;

// Database configuration for PostgreSQL
const dbConfig = {
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: '123qwe!@#',
  database: 'face_reg',
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
};

// Create connection pool
const pool = new Pool(dbConfig);

class Database {
  // Test database connection
  static async testConnection() {
    try {
      const client = await pool.connect();
      console.log('Database connected successfully');
      client.release();
      return true;
    } catch (error) {
      console.error('Database connection failed:', error);
      return false;
    }
  }

  // Execute SELECT queries
  static async select(query, params = []) {
    try {
      const result = await pool.query(query, params);
      return result.rows;
    } catch (error) {
      console.error('Select query error:', error);
      throw error;
    }
  }

  // Execute INSERT queries
  static async insert(query, params = []) {
    try {
      const result = await pool.query(query + ' RETURNING id', params);
      return result.rows[0]?.id;
    } catch (error) {
      console.error('Insert query error:', error);
      throw error;
    }
  }

  // Execute UPDATE queries
  static async update(query, params = []) {
    try {
      const result = await pool.query(query, params);
      return result.rowCount;
    } catch (error) {
      console.error('Update query error:', error);
      throw error;
    }
  }

  // Execute DELETE queries
  static async delete(query, params = []) {
    try {
      const result = await pool.query(query, params);
      return result.rowCount;
    } catch (error) {
      console.error('Delete query error:', error);
      throw error;
    }
  }

  // User authentication methods - updated for accounts table
  static async authenticateUser(userId, password) {
    const query = 'SELECT id, password, role FROM account WHERE id = $1';
    const users = await this.select(query, [userId]);
    
    if (users.length > 0 && users[0].password === password) {
      const { password: _, ...userWithoutPassword } = users[0];
      return userWithoutPassword;
    }
    return null;
  }

  // Get user profile by ID
  static async getUserProfile(userId) {
    const query = 'SELECT id, role, created_at FROM accounts WHERE id = $1';
    const users = await this.select(query, [userId]);
    return users.length > 0 ? users[0] : null;
  }

  // User Management Methods
  static async getAllUsers(filters = {}) {
    let query = 'SELECT id, name, role, password, date_created as "dateCreated" FROM account';
    const params = [];
    
    if (filters.role) {
      query += ' WHERE role = $1';
      params.push(filters.role);
    }
    
    query += ' ORDER BY date_created DESC';
    return await this.select(query, params);
  }

  static async getUserById(userId) {
    const query = 'SELECT id, name, role, password, date_created as "dateCreated" FROM account WHERE id = $1';
    const users = await this.select(query, [userId]);
    return users.length > 0 ? users[0] : null;
  }

  static async createUser(userData) {
    const { id, name, password, role } = userData;
    const query = `
      INSERT INTO account (id, name, password, role, date_created) 
      VALUES ($1, $2, $3, $4, NOW())
      RETURNING id, name, role, date_created as "dateCreated"
    `;
    const result = await this.select(query, [id, name, password, role]);
    return result[0];
  }

  static async updateUser(userId, userData) {
    const { name, password, role } = userData;
    let query = 'UPDATE account SET ';
    const params = [];
    const updates = [];
    let paramCount = 1;

    if (name !== undefined) {
      updates.push(`name = $${paramCount++}`);
      params.push(name);
    }
    if (password !== undefined) {
      updates.push(`password = $${paramCount++}`);
      params.push(password);
    }
    if (role !== undefined) {
      updates.push(`role = $${paramCount++}`);
      params.push(role);
    }

    if (updates.length === 0) {
      throw new Error('No fields to update');
    }

    query += updates.join(', ') + ` WHERE id = $${paramCount} RETURNING id, name, role, date_created as "dateCreated"`;
    params.push(userId);

    const result = await this.select(query, params);
    return result[0];
  }

  static async deleteUser(userId) {
    const query = 'DELETE FROM account WHERE id = $1';
    return await this.delete(query, [userId]);
  }

  // Get student attendance records
  static async getStudentAttendance(studentId) {
    const query = `
      SELECT a.*, c.course_name, c.course_code 
      FROM attendance a 
      JOIN courses c ON a.course_id = c.id 
      WHERE a.student_id = $1 
      ORDER BY a.date DESC
    `;
    return await this.select(query, [studentId]);
  }

  // Record attendance
  static async recordAttendance(studentId, courseId, status, faceImagePath = null) {
    const query = `
      INSERT INTO attendance (student_id, course_id, date, time, status, face_image_path) 
      VALUES ($1, $2, CURRENT_DATE, CURRENT_TIME, $3, $4)
    `;
    return await this.insert(query, [studentId, courseId, status, faceImagePath]);
  }

  // Get student courses
  static async getStudentCourses(studentId) {
    const query = `
      SELECT c.* FROM courses c 
      JOIN student_courses sc ON c.id = sc.course_id 
      WHERE sc.student_id = $1
    `;
    return await this.select(query, [studentId]);
  }

  // Get attendance statistics
  static async getAttendanceStats(studentId) {
    const query = `
      SELECT 
        course_id,
        COUNT(*) as total_sessions,
        SUM(CASE WHEN status = 'present' THEN 1 ELSE 0 END) as present_count,
        ROUND((SUM(CASE WHEN status = 'present' THEN 1 ELSE 0 END)::numeric / COUNT(*)) * 100, 2) as attendance_rate
      FROM attendance 
      WHERE student_id = $1 
      GROUP BY course_id
    `;
    return await this.select(query, [studentId]);
  }

  // Close connection pool
  static async close() {
    await pool.end();
  }
}

export default Database;
