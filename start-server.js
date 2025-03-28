
// This script will start the server from the project root
// const { execSync } = require('child_process');
// const path = require('path');

import { execSync } from 'child_process';
import path from 'path';
console.log('Starting server...');
try {
  // Start the server with the correct path
  // Using PORT 3000 which is the same as the React app in production
  execSync('node src/server/index.js', { 
    stdio: 'inherit',
    env: { ...process.env, PORT: '3001' }
  });
} catch (error) {
  console.error('Failed to start server:', error);
}
