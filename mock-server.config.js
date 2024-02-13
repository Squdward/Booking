/** @type {import('mock-config-server').MockServerConfig} */
const mockServerConfig = {
    cors: {
      origin: "http://localhost:5173",
      allowedHeaders: ['content-type', 'Authorization'],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      credentials: true
    },
    rest: {
      baseUrl: '/api',
      configs: [
        {
          path: '/user',
          method: 'get',
          routes: [{ data: { emoji: '🦁', name: 'Nursultan' } }]
        }
      ]
    },
  };
  
  export default mockServerConfig;