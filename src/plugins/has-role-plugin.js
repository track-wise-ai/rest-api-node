const fp = require("fastify-plugin");

const hasRolePlugin = fp((fastify, options) => {
  fastify.decorate("hasRole", (roles) => {
    return async (req, reply) => {
      const currentUserRole = req.user.payload.role;

      if (!roles.includes(currentUserRole)) {
        reply.status(403).send({ error: "Forbidden" });
      }
    }
  });
});

module.exports = { hasRolePlugin };
