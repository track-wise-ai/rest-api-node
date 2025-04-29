const {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");

const routes = (fastify, options) => {
  fastify.addHook("onRequest", fastify.jwtAuth);
  fastify.addHook("onRequest", fastify.hasRole(["admin"]));

  fastify.get("/", getUsers);
  fastify.get("/:id", getUser);
  fastify.post("/", createUser);
  fastify.put("/:id", updateUser);
  fastify.delete("/:id", deleteUser);
}

module.exports = { routes };
