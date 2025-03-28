
// This script will start the server from the project root
const { execSync } = require('child_process');
const path = require('path');

console.log('Starting server...');
try {
  execSync('node src/server/index.js', { stdio: 'inherit' });
} catch (error) {
  console.error('Failed to start server:', error);
}
