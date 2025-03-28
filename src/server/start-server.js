
// const { spawn } = require('child_process');

// const path = require('path');

import { spawn } from 'child_process';
import path from 'path';
// Path to the server file
const serverPath = path.join(__dirname, 'index.js');

// Start the server process
const server = spawn('node', [serverPath], {
  stdio: 'inherit'
});

console.log('Server starting...');

// Handle server process events
server.on('close', (code) => {
  console.log(`Server process exited with code ${code}`);
});

process.on('SIGINT', () => {
  server.kill('SIGINT');
  process.exit(0);
});
