const { PrismaClient } = require('@prisma/client');

async function verifyDatabase() {
  console.log('🔍 Verifying Prisma & PostgreSQL Connection\n');
  
  const prisma = new PrismaClient();
  
  try {
    // Test 1: Check database connection
    console.log('📡 Test 1: Database Connection');
    await prisma.$connect();
    console.log('✅ PASS - Successfully connected to PostgreSQL database\n');
    
    // Test 2: Count total users
    console.log('👥 Test 2: Count Users in Database');
    const userCount = await prisma.user.count();
    console.log(`✅ PASS - Total users in database: ${userCount}\n`);
    
    // Test 3: Fetch all users (without passwords)
    console.log('📋 Test 3: Fetch All Users');
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    if (users.length > 0) {
      console.log(`✅ PASS - Found ${users.length} user(s):\n`);
      users.forEach((user, index) => {
        console.log(`   ${index + 1}. ${user.name}`);
        console.log(`      Email: ${user.email}`);
        console.log(`      ID: ${user.id}`);
        console.log(`      Created: ${user.createdAt.toLocaleString()}\n`);
      });
    } else {
      console.log('⚠️  WARNING - No users found in database\n');
    }
    
    // Test 4: Verify password hashing
    console.log('🔐 Test 4: Verify Password Hashing');
    const userWithPassword = await prisma.user.findFirst({
      select: {
        email: true,
        password: true
      }
    });
    
    if (userWithPassword && userWithPassword.password.startsWith('$2')) {
      console.log('✅ PASS - Passwords are properly hashed (bcrypt)\n');
    } else {
      console.log('❌ FAIL - Passwords may not be hashed correctly\n');
    }
    
    // Test 5: Check database URL from env
    console.log('🌐 Test 5: Database Configuration');
    const dbUrl = process.env.DATABASE_URL;
    if (dbUrl && dbUrl.includes('neondb')) {
      console.log('✅ PASS - Using Neon PostgreSQL database');
      console.log(`   Host: ${dbUrl.split('@')[1].split('/')[0]}\n`);
    } else {
      console.log('⚠️  WARNING - Database URL not configured properly\n');
    }
    
    // Test 6: Check JWT_SECRET
    console.log('🔑 Test 6: JWT Configuration');
    const jwtSecret = process.env.JWT_SECRET;
    if (jwtSecret && jwtSecret.length > 0) {
      console.log(`✅ PASS - JWT_SECRET is configured`);
      console.log(`   Length: ${jwtSecret.length} characters\n`);
    } else {
      console.log('❌ FAIL - JWT_SECRET not configured\n');
    }
    
    console.log('✨ Database Verification Complete!\n');
    
  } catch (error) {
    console.error('❌ ERROR:', error.message);
    console.error('\nFull error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

verifyDatabase();
