const fp = require("fastify-plugin");

const jwtPlugin = fp((fastify, options) => {
  fastify.register(require("@fastify/jwt"), {
    secret: process.env.JWT_SECRET,
  });

  fastify.decorate("jwtAuth", async (req, reply) => {
    try {
      await req.jwtVerify();
    } catch (error) {
      reply.status(401).send({ error: "Unauthorized" });
    }
  });
});

module.exports = { jwtPlugin };
