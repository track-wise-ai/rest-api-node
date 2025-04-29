const root = async (req, reply) => {
  return reply.status(200).type("text/html").sendFile("index.html");
};

module.exports = { root };
