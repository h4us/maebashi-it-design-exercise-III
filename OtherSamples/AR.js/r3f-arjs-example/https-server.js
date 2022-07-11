const { readFileSync } = require('fs');
const { resolve } = require('path');

const fastify = require('fastify')({
  logger: { level: 'error' },
  pluginTimeout: 0,
  https: {
    allowHTTP1: true,
    key: readFileSync(resolve(__dirname, '.certs/key.pem')),
    cert: readFileSync(resolve(__dirname, '.certs/fullchain.pem'))
  },
});

const Next = require('next');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';

const runServer = async () => {
  fastify
    .register(require('@fastify/cors'), { origin: '*' }) // TODO:
    .register((fastify, opts, next) => {
      const app = Next({ dev });
      const handle = app.getRequestHandler();
      app
        .prepare()
        .then(() => {
          if (dev) {
            fastify.get('/_next/*', (req, reply) => {
              return handle(req.raw, reply.raw).then(() => {
                reply.sent = true;
              });
            });
          }

          fastify.all('/*', (req, reply) => {
            return handle(req.raw, reply.raw).then(() => {
              reply.sent = true;
            });
          });

          fastify.setNotFoundHandler((request, reply) => {
            return app.render404(request.raw, reply.raw).then(() => {
              reply.sent = true;
            });
          });

          next();
        })
        .catch((err) => next(err));
    });

  fastify
    .listen({ host: '0.0.0.0', port })
    .then(_ => console.log(`> Custom server is ready on PORT ${port}`))
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

runServer();
