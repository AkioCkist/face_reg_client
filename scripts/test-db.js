import Database from '../src/lib/database.js';

async function testDatabase() {
  try {
    console.log('🔍 Testing database connection...');
    const connected = await Database.testConnection();
    
    if (connected) {
      console.log('✅ Database connected successfully');
      console.log('📋 Fetching existing users...');
      
      const users = await Database.getAllUsers();
      console.log('👥 Current users in database:');
      
      if (users.length > 0) {
        users.forEach(user => {
          console.log(`- ${user.id}: ${user.name} (${user.role}) - Created: ${user.dateCreated}`);
        });
        console.log(`\nTotal users: ${users.length}`);
      } else {
        console.log('No users found in the database');
      }
      
      // Test user roles distribution
      const roles = users.reduce((acc, user) => {
        acc[user.role] = (acc[user.role] || 0) + 1;
        return acc;
      }, {});
      
      console.log('\n📊 User distribution by role:');
      Object.entries(roles).forEach(([role, count]) => {
        console.log(`- ${role}: ${count} user(s)`);
      });
      
    } else {
      console.error('❌ Failed to connect to database');
    }
  } catch (error) {
    console.error('❌ Database test failed:', error);
  } finally {
    await Database.close();
  }
}

testDatabase();