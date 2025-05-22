const { syncTrackLog } = require("../controllers/jira.controller");

const routes = (fastify, options) => {
  fastify.addHook("onRequest", fastify.jwtAuth);

  fastify.post("/track-log", syncTrackLog);
};

module.exports = { routes };
