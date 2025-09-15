import Database from '../src/lib/database.js';

async function checkTableStructure() {
  try {
    console.log('🔍 Checking account table structure...');
    const connected = await Database.testConnection();
    
    if (connected) {
      console.log('✅ Database connected successfully');
      
      // Check table structure
      const tableInfo = await Database.select(`
        SELECT column_name, data_type, is_nullable 
        FROM information_schema.columns 
        WHERE table_name = 'account' 
        ORDER BY ordinal_position;
      `);
      
      console.log('📋 Account table structure:');
      tableInfo.forEach(col => {
        console.log(`- ${col.column_name}: ${col.data_type} (${col.is_nullable === 'YES' ? 'nullable' : 'not null'})`);
      });
      
      // Try to get users with basic columns
      console.log('\n👥 Fetching existing users (basic info):');
      const users = await Database.select('SELECT * FROM account LIMIT 5');
      
      if (users.length > 0) {
        console.log('Sample users:');
        users.forEach(user => {
          console.log(`- ${user.id}: ${user.name || 'No Name'} (${user.role || 'No Role'})`);
        });
      } else {
        console.log('No users found in the database');
      }
      
    } else {
      console.error('❌ Failed to connect to database');
    }
  } catch (error) {
    console.error('❌ Database check failed:', error.message);
  } finally {
    await Database.close();
  }
}

checkTableStructure();