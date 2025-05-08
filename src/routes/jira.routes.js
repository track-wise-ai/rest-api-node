const { getWorkLogs, postWorkLogs } = require("../controllers/jira.controller");

const routes = (fastify, options) => {
  fastify.addHook("onRequest", fastify.jwtAuth);

  fastify.get("/worklogs", getWorkLogs);
  fastify.post("/worklogs", postWorkLogs);
};

module.exports = { routes };
