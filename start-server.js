
// This script will start the server from the project root
<<<<<<< HEAD
// const { execSync } = require('child_process');
// const path = require('path');
=======
const { execSync } = require('child_process');
>>>>>>> c096984b88cfeb4f33f2651019801bc1b18055c7

import { execSync } from 'child_process';
import path from 'path';
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
