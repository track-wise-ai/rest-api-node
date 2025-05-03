const { syncTrackLog } = require("../controllers/jira.controller");

const routes = (fastify, options) => {
  fastify.addHook("onRequest", fastify.jwtAuth);

  fastify.post("/sync", syncTrackLog);
};

module.exports = { routes };
