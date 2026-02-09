// Script to reset admin password via API
// This works even if MongoDB credentials are incorrect locally
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

const API_URL = process.env.FRONTEND_URL || 'https://codex1-nq28.onrender.com';

async function resetAdminPassword() {
  try {
    console.log('🔧 Attempting to create/reset admin via API...');
    console.log('📍 API URL:', API_URL);
    
    const response = await fetch(`${API_URL}/api/auth/admin-register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'admin@mithilamakhana.com',
        password: 'admin123'
      }),
    });

    const data = await response.json();
    console.log('📦 Response:', data);

    if (data.success) {
      console.log('✅ Admin account created/reset successfully!');
      console.log('📧 Email: admin@mithilamakhana.com');
      console.log('🔐 Password: admin123');
    } else {
      console.log('⚠️  Response:', data.message);
      if (data.message.includes('already exists')) {
        console.log('\n💡 The admin user already exists.');
        console.log('💡 This could mean:');
        console.log('   1. The password is correct but you\'re entering it wrong');
        console.log('   2. The password was changed from the default');
        console.log('   3. There\'s a password hashing issue');
      }
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\n💡 Please update MongoDB credentials in backend/.env');
  }
}

resetAdminPassword();
