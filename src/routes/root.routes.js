const { ping } = require("../controllers/root.controller");

const routes = (fastify, options) => {
  fastify.get("/ping", ping);
};

module.exports = { routes };
