
# Vitify Music App

A modern music streaming application built with React, TypeScript, and Express.

## Features

- Browse artists and their discography
- View detailed artist information
- Latest music news
- Interactive AI chat assistant
- Responsive design for all devices

## Deployment Notes

This application includes both frontend and backend components:

### Frontend
- Built with React, TypeScript and Tailwind CSS
- Responsive design for all screen sizes
- Artist pages, news articles, and search functionality

### Backend
- Express server providing API endpoints
- LowDB for data storage
- CORS enabled for cross-origin requests

### Deployment Considerations

When deploying this application:

1. For platforms that support both frontend and backend:
   - Deploy the entire application as is
   - Ensure the server can start with `node src/server/index.js`

2. For static hosting platforms (frontend only):
   - The app includes fallback data for when the backend is not available
   - All core features will still work with static data

## Getting Started Locally

```bash
# Install dependencies
npm install

# Start the backend server
node src/server/index.js

# In another terminal, start the frontend
npm run dev
```
