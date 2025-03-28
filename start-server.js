
// This script will start the server from the project root
const { execSync } = require('child_process');

console.log('Starting server...');
try {
  // Start the server with the correct path
  execSync('node src/server/index.js', { 
    stdio: 'inherit',
    env: { ...process.env, PORT: '3001' }
  });
} catch (error) {
  console.error('Failed to start server:', error);
}
