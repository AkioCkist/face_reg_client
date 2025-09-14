import mysql from 'mysql2/promise';

// Database configuration for Laragon MySQL
const dbConfig = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '', // Default Laragon password is empty
  database: 'face_reg', // Change to your database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Create connection pool
const pool = mysql.createPool(dbConfig);

class Database {
  // Test database connection
  static async testConnection() {
    try {
      const connection = await pool.getConnection();
      console.log('Database connected successfully');
      connection.release();
      return true;
    } catch (error) {
      console.error('Database connection failed:', error);
      return false;
    }
  }

  // Execute SELECT queries
  static async select(query, params = []) {
    try {
      const [rows] = await pool.execute(query, params);
      return rows;
    } catch (error) {
      console.error('Select query error:', error);
      throw error;
    }
  }

  // Execute INSERT queries
  static async insert(query, params = []) {
    try {
      const [result] = await pool.execute(query, params);
      return result.insertId;
    } catch (error) {
      console.error('Insert query error:', error);
      throw error;
    }
  }

  // Execute UPDATE queries
  static async update(query, params = []) {
    try {
      const [result] = await pool.execute(query, params);
      return result.affectedRows;
    } catch (error) {
      console.error('Update query error:', error);
      throw error;
    }
  }

  // Execute DELETE queries
  static async delete(query, params = []) {
    try {
      const [result] = await pool.execute(query, params);
      return result.affectedRows;
    } catch (error) {
      console.error('Delete query error:', error);
      throw error;
    }
  }

  // User authentication methods - updated for accounts table
  static async authenticateUser(userId, password) {
    const query = 'SELECT id, password, role FROM account WHERE id = ?';
    const users = await this.select(query, [userId]);
    
    if (users.length > 0 && users[0].password === password) {
      const { password: _, ...userWithoutPassword } = users[0];
      return userWithoutPassword;
    }
    return null;
  }

  // Get user profile by ID
  static async getUserProfile(userId) {
    const query = 'SELECT id, role, created_at FROM accounts WHERE id = ?';
    const users = await this.select(query, [userId]);
    return users.length > 0 ? users[0] : null;
  }

  // Get student attendance records
  static async getStudentAttendance(studentId) {
    const query = `
      SELECT a.*, c.course_name, c.course_code 
      FROM attendance a 
      JOIN courses c ON a.course_id = c.id 
      WHERE a.student_id = ? 
      ORDER BY a.date DESC
    `;
    return await this.select(query, [studentId]);
  }

  // Record attendance
  static async recordAttendance(studentId, courseId, status, faceImagePath = null) {
    const query = `
      INSERT INTO attendance (student_id, course_id, date, time, status, face_image_path) 
      VALUES (?, ?, CURDATE(), CURTIME(), ?, ?)
    `;
    return await this.insert(query, [studentId, courseId, status, faceImagePath]);
  }

  // Get student courses
  static async getStudentCourses(studentId) {
    const query = `
      SELECT c.* FROM courses c 
      JOIN student_courses sc ON c.id = sc.course_id 
      WHERE sc.student_id = ?
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
        ROUND((SUM(CASE WHEN status = 'present' THEN 1 ELSE 0 END) / COUNT(*)) * 100, 2) as attendance_rate
      FROM attendance 
      WHERE student_id = ? 
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
