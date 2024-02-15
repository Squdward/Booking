/** @type {import('mock-config-server').MockServerConfig} */

import Routes from './backend/routes';

const mockServerConfig = {
    cors: {
      origin: "http://localhost:5173",
      allowedHeaders: ['content-type', 'Authorization'],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      credentials: true
    },
    rest: {
      baseUrl: '/api',
      configs: Routes, // List of all routes 
    },
  };
  
  export default mockServerConfig;