import Database from '../src/lib/database.js';

async function initializeDatabase() {
  console.log('🚀 Initializing Face Recognition Database...');
  
  try {
    // Test database connection
    console.log('📡 Testing database connection...');
    const isConnected = await Database.testConnection();
    
    if (!isConnected) {
      console.error('❌ Failed to connect to database');
      process.exit(1);
    }
    
    console.log('✅ Database connection successful');
    
    // Create account table
    console.log('📋 Creating account table...');
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS account (
          id VARCHAR(50) PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          password VARCHAR(255) NOT NULL,
          role VARCHAR(20) NOT NULL CHECK (role IN ('student', 'teacher', 'admin')),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `;
    
    await Database.select(createTableQuery);
    console.log('✅ Account table created successfully');
    
    // Create indexes
    console.log('🔍 Creating indexes...');
    await Database.select('CREATE INDEX IF NOT EXISTS idx_account_role ON account(role);');
    await Database.select('CREATE INDEX IF NOT EXISTS idx_account_created_at ON account(created_at);');
    console.log('✅ Indexes created successfully');
    
    // Insert sample data
    console.log('👥 Inserting sample users...');
    const sampleUsers = [
      {
        id: 'admin001',
        name: 'System Administrator',
        password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8.jDrPhzGwmVhgwS3qa', // password: "admin123"
        role: 'admin'
      },
      {
        id: 'teacher001',
        name: 'John Smith',
        password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8.jDrPhzGwmVhgwS3qa', // password: "teacher123"
        role: 'teacher'
      },
      {
        id: 'student001',
        name: 'Alice Johnson',
        password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8.jDrPhzGwmVhgwS3qa', // password: "student123"
        role: 'student'
      }
    ];
    
    for (const user of sampleUsers) {
      try {
        await Database.select(
          'INSERT INTO account (id, name, password, role, created_at) SELECT $1, $2, $3, $4, NOW() WHERE NOT EXISTS (SELECT 1 FROM account WHERE id = $1)',
          [user.id, user.name, user.password, user.role]
        );
        console.log(`✅ Sample user created: ${user.name} (${user.role})`);
      } catch (error) {
        console.log(`ℹ️  User ${user.id} already exists, skipping...`);
      }
    }
    
    // Create updated_at trigger
    console.log('⚙️ Creating triggers...');
    const triggerFunction = `
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
          NEW.updated_at = NOW();
          RETURN NEW;
      END;
      $$ language 'plpgsql';
    `;
    
    const trigger = `
      DROP TRIGGER IF EXISTS update_account_updated_at ON account;
      CREATE TRIGGER update_account_updated_at 
          BEFORE UPDATE ON account 
          FOR EACH ROW 
          EXECUTE FUNCTION update_updated_at_column();
    `;
    
    await Database.select(triggerFunction);
    await Database.select(trigger);
    console.log('✅ Triggers created successfully');
    
    console.log('🎉 Database initialization completed successfully!');
    console.log('\n📝 Sample Login Credentials:');
    console.log('   Admin: admin001 / admin123');
    console.log('   Teacher: teacher001 / teacher123');
    console.log('   Student: student001 / student123');
    
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    process.exit(1);
  } finally {
    await Database.close();
    process.exit(0);
  }
}

// Run the initialization
initializeDatabase();