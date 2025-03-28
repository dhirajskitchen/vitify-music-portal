
// This script will start the server from the project root
// const { execSync } = require('child_process');
// const path = require('path');

import { execSync } from 'child_process';
import path from 'path';
console.log('Starting server...');
try {
  execSync('node src/server/index.js', { stdio: 'inherit' });
} catch (error) {
  console.error('Failed to start server:', error);
}
