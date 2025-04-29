const { root } = require("../controllers/root.controller");

const routes = (fastify, options) => {
  fastify.get("/", root);
};

module.exports = { routes };
