/** @type {import('mock-config-server').MockServerConfig} */
const mockServerConfig = {
    rest: {
      baseUrl: '/api',
      configs: [
        {
          path: '/user',
          method: 'get',
          routes: [{ data: { emoji: '🦁', name: 'Nursultan' } }]
        }
      ]
    }
  };
  
  export default mockServerConfig;