const { saveSettings } = require("../controllers/settings.controller");

const routes = (fastify, options) => {
  fastify.addHook("onRequest", fastify.jwtAuth);

  fastify.post("/", saveSettings);
};

module.exports = { routes };
