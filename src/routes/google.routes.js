const {
  root,
  connect,
  settings,
  callback,
  disconnect,
} = require("../controllers/google.controller");

const routes = (fastify, options) => {
  fastify.get("/", { onRequest: fastify.jwtAuth }, root);
  fastify.get("/settings", { onRequest: fastify.jwtAuth }, settings);
  fastify.get("/connect", { onRequest: fastify.jwtAuth }, connect);
  fastify.get("/disconnect", { onRequest: fastify.jwtAuth }, disconnect);
  fastify.get("/callback", callback);
};

module.exports = { routes };
