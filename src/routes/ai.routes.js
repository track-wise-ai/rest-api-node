const { root, generate, settings } = require("../controllers/ai.controller");

const routes = (fastify, options) => {
  fastify.addHook("onRequest", fastify.jwtAuth);

  fastify.get("/", root);
  fastify.post("/", generate);
  fastify.get("/settings", settings);
};

module.exports = { routes, settings };
