
// This script will start the server from the project root
const { execSync } = require('child_process');

console.log('Starting server...');
try {
  // Start the server with the correct path
  // Using PORT 3000 which is the same as the React app in production
  execSync('node src/server/index.js', { 
    stdio: 'inherit',
    env: { ...process.env, PORT: '3000' }
  });
} catch (error) {
  console.error('Failed to start server:', error);
}
