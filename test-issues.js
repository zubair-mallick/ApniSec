const BASE_URL = 'http://localhost:3000';

async function testIssuesAPI() {
  console.log('🚀 Starting Issues API Test Suite\n');
  
  let token = '';
  const testEmail = `test-issues-${Date.now()}@example.com`;
  const testPassword = 'TestPassword123!';
  
  // First, register and login to get token
  console.log('📝 Setup: Register and Login');
  try {
    const registerRes = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Issue Tester',
        email: testEmail,
        password: testPassword
      })
    });
    
    const registerData = await registerRes.json();
    if (registerData.success) {
      token = registerData.data.token;
      console.log('✅ Setup complete - User registered and authenticated\n');
    } else {
      console.log('❌ Setup failed - Could not register user');
      return;
    }
  } catch (error) {
    console.log('❌ Setup failed:', error.message);
    return;
  }

  let issueId = '';

  // Test Case 1: Create Issue
  console.log('➕ Test 1: Create New Issue');
  try {
    const res = await fetch(`${BASE_URL}/api/issues`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        type: 'Cloud Security',
        title: 'Test Security Vulnerability',
        description: 'This is a test vulnerability in cloud infrastructure',
        priority: 'high'
      })
    });
    
    const data = await res.json();
    
    if (res.status === 201 && data.success && data.data.id) {
      console.log('✅ PASS - Issue created successfully');
      console.log(`   Issue ID: ${data.data.id}`);
      console.log(`   Title: ${data.data.title}`);
      console.log(`   Status: ${data.data.status}`);
      issueId = data.data.id;
    } else {
      console.log('❌ FAIL - Issue creation failed');
      console.log('   Response:', JSON.stringify(data, null, 2));
    }
  } catch (error) {
    console.log('❌ FAIL - Error:', error.message);
  }
  console.log('');

  // Test Case 2: Get All Issues
  console.log('📋 Test 2: Get All Issues');
  try {
    const res = await fetch(`${BASE_URL}/api/issues`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    const data = await res.json();
    
    if (res.ok && data.success && Array.isArray(data.data)) {
      console.log(`✅ PASS - Retrieved ${data.data.length} issue(s)`);
      if (data.data.length > 0) {
        console.log(`   First issue: ${data.data[0].title}`);
      }
    } else {
      console.log('❌ FAIL - Could not retrieve issues');
      console.log('   Response:', JSON.stringify(data, null, 2));
    }
  } catch (error) {
    console.log('❌ FAIL - Error:', error.message);
  }
  console.log('');

  // Test Case 3: Get Issue by ID
  console.log('🔍 Test 3: Get Issue by ID');
  try {
    const res = await fetch(`${BASE_URL}/api/issues/${issueId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    const data = await res.json();
    
    if (res.ok && data.success && data.data.id === issueId) {
      console.log('✅ PASS - Issue retrieved successfully');
      console.log(`   Title: ${data.data.title}`);
      console.log(`   Description: ${data.data.description}`);
      console.log(`   Priority: ${data.data.priority}`);
    } else {
      console.log('❌ FAIL - Could not retrieve issue');
      console.log('   Response:', JSON.stringify(data, null, 2));
    }
  } catch (error) {
    console.log('❌ FAIL - Error:', error.message);
  }
  console.log('');

  // Test Case 4: Update Issue
  console.log('✏️  Test 4: Update Issue');
  try {
    const res = await fetch(`${BASE_URL}/api/issues/${issueId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        status: 'in-progress',
        priority: 'critical'
      })
    });
    
    const data = await res.json();
    
    if (res.ok && data.success && data.data.status === 'in-progress') {
      console.log('✅ PASS - Issue updated successfully');
      console.log(`   New Status: ${data.data.status}`);
      console.log(`   New Priority: ${data.data.priority}`);
    } else {
      console.log('❌ FAIL - Issue update failed');
      console.log('   Response:', JSON.stringify(data, null, 2));
    }
  } catch (error) {
    console.log('❌ FAIL - Error:', error.message);
  }
  console.log('');

  // Test Case 5: Get Issue Stats
  console.log('📊 Test 5: Get Issue Statistics');
  try {
    const res = await fetch(`${BASE_URL}/api/issues/stats`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    const data = await res.json();
    
    if (res.ok && data.success && data.data.total !== undefined) {
      console.log('✅ PASS - Statistics retrieved successfully');
      console.log(`   Total Issues: ${data.data.total}`);
      console.log(`   Open: ${data.data.open}`);
      console.log(`   In Progress: ${data.data.inProgress}`);
      console.log(`   Resolved: ${data.data.resolved}`);
      console.log(`   Closed: ${data.data.closed}`);
    } else {
      console.log('❌ FAIL - Could not retrieve statistics');
      console.log('   Response:', JSON.stringify(data, null, 2));
    }
  } catch (error) {
    console.log('❌ FAIL - Error:', error.message);
  }
  console.log('');

  // Test Case 6: Filter Issues by Type
  console.log('🔎 Test 6: Filter Issues by Type');
  try {
    const res = await fetch(`${BASE_URL}/api/issues?type=Cloud Security`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    const data = await res.json();
    
    if (res.ok && data.success && Array.isArray(data.data)) {
      const allCloudSecurity = data.data.every(issue => issue.type === 'Cloud Security');
      if (allCloudSecurity) {
        console.log(`✅ PASS - Filtered ${data.data.length} Cloud Security issue(s)`);
      } else {
        console.log('❌ FAIL - Filter not working correctly');
      }
    } else {
      console.log('❌ FAIL - Could not filter issues');
      console.log('   Response:', JSON.stringify(data, null, 2));
    }
  } catch (error) {
    console.log('❌ FAIL - Error:', error.message);
  }
  console.log('');

  // Test Case 7: Search Issues
  console.log('🔍 Test 7: Search Issues');
  try {
    const res = await fetch(`${BASE_URL}/api/issues?search=vulnerability`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    const data = await res.json();
    
    if (res.ok && data.success && Array.isArray(data.data)) {
      console.log(`✅ PASS - Search returned ${data.data.length} result(s)`);
      if (data.data.length > 0) {
        console.log(`   Found: ${data.data[0].title}`);
      }
    } else {
      console.log('❌ FAIL - Search failed');
      console.log('   Response:', JSON.stringify(data, null, 2));
    }
  } catch (error) {
    console.log('❌ FAIL - Error:', error.message);
  }
  console.log('');

  // Test Case 8: Create Issue without Authentication (should fail)
  console.log('🚫 Test 8: Create Issue Without Token');
  try {
    const res = await fetch(`${BASE_URL}/api/issues`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'VAPT',
        title: 'Unauthorized Issue',
        description: 'This should fail'
      })
    });
    
    const data = await res.json();
    
    if (!data.success && res.status === 401) {
      console.log('✅ PASS - Unauthorized request correctly rejected');
      console.log(`   Error: ${data.error}`);
    } else {
      console.log('❌ FAIL - Should have rejected unauthorized request');
      console.log('   Response:', JSON.stringify(data, null, 2));
    }
  } catch (error) {
    console.log('❌ FAIL - Error:', error.message);
  }
  console.log('');

  // Test Case 9: Delete Issue
  console.log('🗑️  Test 9: Delete Issue');
  try {
    const res = await fetch(`${BASE_URL}/api/issues/${issueId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    const data = await res.json();
    
    if (res.ok && data.success) {
      console.log('✅ PASS - Issue deleted successfully');
      console.log(`   Message: ${data.message}`);
    } else {
      console.log('❌ FAIL - Issue deletion failed');
      console.log('   Response:', JSON.stringify(data, null, 2));
    }
  } catch (error) {
    console.log('❌ FAIL - Error:', error.message);
  }
  console.log('');

  // Test Case 10: Verify Deletion
  console.log('✅ Test 10: Verify Issue Deleted');
  try {
    const res = await fetch(`${BASE_URL}/api/issues/${issueId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    const data = await res.json();
    
    if (!data.success && res.status === 404) {
      console.log('✅ PASS - Issue no longer exists (404)');
      console.log(`   Error: ${data.error}`);
    } else {
      console.log('❌ FAIL - Issue should have been deleted');
      console.log('   Response:', JSON.stringify(data, null, 2));
    }
  } catch (error) {
    console.log('❌ FAIL - Error:', error.message);
  }
  console.log('');

  console.log('✨ Issues API Test Suite Complete!\n');
}

testIssuesAPI().catch(console.error);
