const { createProxyMiddleware } = require('http-proxy-middleware');

const setupProxy = (app) => {
  app.use(
    createProxyMiddleware('/graphql', { target: 'http://localhost:4000' }),
  );
  app.use(
    createProxyMiddleware('/subscriptions', {
      target: 'http://localhost:4000',
      ws: true,
    }),
  );
};

module.exports = setupProxy;
