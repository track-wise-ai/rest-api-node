const { login, signup } = require("../controllers/auth.controller");

const routes = (fastify, options) => {
  fastify.post("/login", login);
  fastify.post("/signup", signup);
};

module.exports = { routes };
