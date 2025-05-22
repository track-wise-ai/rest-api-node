const ping = async (req, reply) => {
  return reply.status(200).send("pong");
};

module.exports = { ping };
