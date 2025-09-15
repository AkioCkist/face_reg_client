import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import Database from '../../../lib/database';

// GET /api/users - Get all users
export async function GET(request) {
  try {
    // In production, add authentication middleware
    const { searchParams } = new URL(request.url);
    const role = searchParams.get('role');
    
    const filters = {};
    if (role) {
      filters.role = role;
    }
    
    const users = await Database.getAllUsers(filters);
    
    // Remove password from response
    const safeUsers = users.map(({ password, ...user }) => user);
    
    return NextResponse.json({
      success: true,
      data: safeUsers
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

// POST /api/users - Create new user
export async function POST(request) {
  try {
    const userData = await request.json();
    const { id, name, password, role } = userData;
    
    // Validate required fields
    if (!id || !name || !password || !role) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Check if user ID already exists
    const existingUser = await Database.getUserById(id);
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'User ID already exists' },
        { status: 409 }
      );
    }
    
    // Validate role
    if (!['student', 'teacher', 'admin'].includes(role)) {
      return NextResponse.json(
        { success: false, error: 'Invalid role' },
        { status: 400 }
      );
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Create new user in database
    const newUser = await Database.createUser({
      id,
      name,
      password: hashedPassword,
      role
    });
    
    return NextResponse.json({
      success: true,
      message: 'User created successfully',
      data: newUser
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create user' },
      { status: 500 }
    );
  }
}