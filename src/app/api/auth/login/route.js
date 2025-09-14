import { NextResponse } from 'next/server';
import Database from '../../../../lib/database';

export async function POST(request) {
  try {
    const { userId, password } = await request.json();

    if (!userId || !password) {
      return NextResponse.json(
        { error: 'ID and password are required' },
        { status: 400 }
      );
    }

    // Test database connection
    const isConnected = await Database.testConnection();
    if (!isConnected) {
      return NextResponse.json(
        { error: 'Database connection failed' },
        { status: 500 }
      );
    }

    // Authenticate user
    const user = await Database.authenticateUser(userId, password);

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid ID or password' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      message: 'Login successful',
      user: {
        id: user.id,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
