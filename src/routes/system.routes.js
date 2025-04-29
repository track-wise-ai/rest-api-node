const { ping } = require("../controllers/system.controller");

const routes = (fastify, options) => {
  fastify.get("/ping", ping);
};

module.exports = { routes };
