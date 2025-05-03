const root = async (req, reply) => {
  return reply.status(200).type("text/html").sendFile("index.html");
};

const ping = async (req, reply) => {
  return reply.status(200).send({ ping: "pong" });
};

module.exports = { root, ping };
