const ping = async (req, reply) => {
  return reply.status(200).send({ ping: "pong" });
};

module.exports = { ping };
