const { generate } = require("../controllers/ai.controller");

const routes = (fastify, options) => {
  fastify.addHook("onRequest", fastify.jwtAuth);

  fastify.post("/", generate);
};

module.exports = { routes };
