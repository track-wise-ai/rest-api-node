const { root, ping } = require("../controllers/root.controller");

const routes = (fastify, options) => {
  fastify.get("/", root);
  fastify.get("/ping", ping);
};

module.exports = { routes };
