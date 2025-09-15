import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import Database from '../../../../lib/database';

// GET /api/users/[userId] - Get user by ID
export async function GET(request, { params }) {
  try {
    const { userId } = params;
    
    const user = await Database.getUserById(userId);
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Remove password from response
    const { password, ...safeUser } = user;
    
    return NextResponse.json({
      success: true,
      data: safeUser
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch user' },
      { status: 500 }
    );
  }
}

// PATCH /api/users/[userId] - Update user
export async function PATCH(request, { params }) {
  try {
    const { userId } = params;
    const updateData = await request.json();
    
    const existingUser = await Database.getUserById(userId);
    
    if (!existingUser) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Validate role if provided
    if (updateData.role && !['student', 'teacher', 'admin'].includes(updateData.role)) {
      return NextResponse.json(
        { success: false, error: 'Invalid role' },
        { status: 400 }
      );
    }
    
    // Hash password if provided
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 12);
    }
    
    // Update user in database
    const updatedUser = await Database.updateUser(userId, updateData);
    
    return NextResponse.json({
      success: true,
      message: 'User updated successfully',
      data: updatedUser
    });
    
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update user' },
      { status: 500 }
    );
  }
}

// DELETE /api/users/[userId] - Delete user
export async function DELETE(request, { params }) {
  try {
    const { userId } = params;
    
    const existingUser = await Database.getUserById(userId);
    
    if (!existingUser) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Delete user from database
    const deletedCount = await Database.deleteUser(userId);
    
    if (deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'User not found or already deleted' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'User deleted successfully'
    });
    
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete user' },
      { status: 500 }
    );
  }
}