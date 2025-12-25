const BASE_URL = 'http://localhost:3000';

async function testAuth() {
  console.log('🚀 Starting Authentication Test Suite\n');
  
  let token = '';
  const testEmail = `test-${Date.now()}@example.com`;
  const testPassword = 'TestPassword123!';
  const testName = 'Test User';

  // Test Case 1: Register new user
  console.log('📝 Test 1: Register New User');
  try {
    const res = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: testName,
        email: testEmail,
        password: testPassword
      })
    });
    
    const data = await res.json();
    
    if (res.status === 201 && data.success && data.data.user && data.data.token) {
      console.log('✅ PASS - User registered successfully');
      console.log(`   User ID: ${data.data.user.id}`);
      console.log(`   Email: ${data.data.user.email}`);
      console.log(`   Token received: ${data.data.token.substring(0, 20)}...`);
      token = data.data.token;
    } else {
      console.log('❌ FAIL - Registration failed');
      console.log('   Response:', JSON.stringify(data, null, 2));
    }
  } catch (error) {
    console.log('❌ FAIL - Error:', error.message);
  }
  console.log('');

  // Test Case 2: Duplicate email registration (should fail)
  console.log('🔄 Test 2: Duplicate Email Registration');
  try {
    const res = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: testName,
        email: testEmail,
        password: testPassword
      })
    });
    
    const data = await res.json();
    
    if (!data.success && res.status === 400) {
      console.log('✅ PASS - Duplicate registration correctly rejected');
      console.log(`   Error: ${data.error}`);
    } else {
      console.log('❌ FAIL - Should have rejected duplicate email');
      console.log('   Response:', JSON.stringify(data, null, 2));
    }
  } catch (error) {
    console.log('❌ FAIL - Error:', error.message);
  }
  console.log('');

  // Test Case 3: Login with correct credentials
  console.log('🔐 Test 3: Login with Correct Credentials');
  try {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testEmail,
        password: testPassword
      })
    });
    
    const data = await res.json();
    
    if (res.ok && data.success && data.data.token) {
      console.log('✅ PASS - Login successful');
      console.log(`   Token: ${data.data.token.substring(0, 20)}...`);
      console.log(`   User: ${data.data.user.name} (${data.data.user.email})`);
      token = data.data.token;
    } else {
      console.log('❌ FAIL - Login failed');
      console.log('   Response:', JSON.stringify(data, null, 2));
    }
  } catch (error) {
    console.log('❌ FAIL - Error:', error.message);
  }
  console.log('');

  // Test Case 4: Login with incorrect credentials (should fail)
  console.log('🚫 Test 4: Login with Wrong Password');
  try {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testEmail,
        password: 'WrongPassword123!'
      })
    });
    
    const data = await res.json();
    
    if (!data.success && res.status === 401) {
      console.log('✅ PASS - Invalid credentials correctly rejected');
      console.log(`   Error: ${data.error}`);
    } else {
      console.log('❌ FAIL - Should have rejected invalid credentials');
      console.log('   Response:', JSON.stringify(data, null, 2));
    }
  } catch (error) {
    console.log('❌ FAIL - Error:', error.message);
  }
  console.log('');

  // Test Case 5: Access protected route /api/auth/me with valid token
  console.log('🔒 Test 5: Access Protected Route with Valid Token');
  try {
    const res = await fetch(`${BASE_URL}/api/auth/me`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    const data = await res.json();
    
    if (res.ok && data.success && data.data.user) {
      console.log('✅ PASS - Protected route accessed successfully');
      console.log(`   User ID: ${data.data.user.id}`);
      console.log(`   Name: ${data.data.user.name}`);
      console.log(`   Email: ${data.data.user.email}`);
      console.log(`   Response structure: { success: ${data.success}, data: { user: {...} } }`);
    } else {
      console.log('❌ FAIL - Could not access protected route');
      console.log('   Response:', JSON.stringify(data, null, 2));
    }
  } catch (error) {
    console.log('❌ FAIL - Error:', error.message);
  }
  console.log('');

  // Test Case 6: Access protected route without token (should fail)
  console.log('🔓 Test 6: Access Protected Route Without Token');
  try {
    const res = await fetch(`${BASE_URL}/api/auth/me`);
    
    const data = await res.json();
    
    if (!data.success && res.status === 401) {
      console.log('✅ PASS - Unauthorized access correctly rejected');
      console.log(`   Error: ${data.error}`);
    } else {
      console.log('❌ FAIL - Should have rejected unauthorized access');
      console.log('   Response:', JSON.stringify(data, null, 2));
    }
  } catch (error) {
    console.log('❌ FAIL - Error:', error.message);
  }
  console.log('');

  // Test Case 7: Access protected route with invalid token (should fail)
  console.log('🔐 Test 7: Access Protected Route with Invalid Token');
  try {
    const res = await fetch(`${BASE_URL}/api/auth/me`, {
      headers: { 'Authorization': 'Bearer invalid.token.here' }
    });
    
    const data = await res.json();
    
    if (!data.success && res.status === 401) {
      console.log('✅ PASS - Invalid token correctly rejected');
      console.log(`   Error: ${data.error}`);
    } else {
      console.log('❌ FAIL - Should have rejected invalid token');
      console.log('   Response:', JSON.stringify(data, null, 2));
    }
  } catch (error) {
    console.log('❌ FAIL - Error:', error.message);
  }
  console.log('');

  console.log('✨ Test Suite Complete!\n');
}

testAuth().catch(console.error);
