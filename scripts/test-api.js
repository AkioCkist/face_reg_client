// Test API endpoints for user management
const BASE_URL = 'http://localhost:3001';

async function testUserAPI() {
  console.log('🧪 Testing User Management API...\n');
  
  try {
    // Test 1: Get all users
    console.log('1️⃣ Testing GET /api/users');
    const response1 = await fetch(`${BASE_URL}/api/users`);
    const users = await response1.json();
    
    if (users.success) {
      console.log('✅ Get users successful');
      console.log(`📊 Found ${users.data.length} users:`);
      users.data.forEach(user => {
        console.log(`   - ${user.id}: ${user.name} (${user.role})`);
      });
    } else {
      console.log('❌ Get users failed:', users.error);
    }
    
    console.log('\n' + '='.repeat(50) + '\n');
    
    // Test 2: Create a new user
    console.log('2️⃣ Testing POST /api/users (Create User)');
    const newUser = {
      id: 'test001',
      name: 'Test User',
      password: 'testpass123',
      role: 'student'
    };
    
    const response2 = await fetch(`${BASE_URL}/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    });
    
    const createResult = await response2.json();
    
    if (createResult.success) {
      console.log('✅ Create user successful');
      console.log('📝 Created user:', createResult.data);
    } else {
      console.log('❌ Create user failed:', createResult.error);
    }
    
    console.log('\n' + '='.repeat(50) + '\n');
    
    // Test 3: Get specific user
    console.log('3️⃣ Testing GET /api/users/test001');
    const response3 = await fetch(`${BASE_URL}/api/users/test001`);
    const userResult = await response3.json();
    
    if (userResult.success) {
      console.log('✅ Get specific user successful');
      console.log('👤 User details:', userResult.data);
    } else {
      console.log('❌ Get specific user failed:', userResult.error);
    }
    
    console.log('\n' + '='.repeat(50) + '\n');
    
    // Test 4: Update user
    console.log('4️⃣ Testing PATCH /api/users/test001 (Update User)');
    const updateData = {
      name: 'Updated Test User',
      role: 'teacher'
    };
    
    const response4 = await fetch(`${BASE_URL}/api/users/test001`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateData)
    });
    
    const updateResult = await response4.json();
    
    if (updateResult.success) {
      console.log('✅ Update user successful');
      console.log('📝 Updated user:', updateResult.data);
    } else {
      console.log('❌ Update user failed:', updateResult.error);
    }
    
    console.log('\n' + '='.repeat(50) + '\n');
    
    // Test 5: Delete user (cleanup)
    console.log('5️⃣ Testing DELETE /api/users/test001 (Delete User)');
    const response5 = await fetch(`${BASE_URL}/api/users/test001`, {
      method: 'DELETE'
    });
    
    const deleteResult = await response5.json();
    
    if (deleteResult.success) {
      console.log('✅ Delete user successful');
      console.log('🗑️ User deleted:', deleteResult.message);
    } else {
      console.log('❌ Delete user failed:', deleteResult.error);
    }
    
    console.log('\n🎉 API Testing Complete!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Wait a moment for server to be ready, then run tests
setTimeout(testUserAPI, 2000);