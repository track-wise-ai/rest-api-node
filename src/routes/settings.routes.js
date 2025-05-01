const { getSettings, saveSettings } = require("../controllers/settings.controller");

const routes = (fastify, options) => {
  fastify.addHook("onRequest", fastify.jwtAuth);

  fastify.get("/", getSettings);
  fastify.post("/", saveSettings);
};

module.exports = { routes };
