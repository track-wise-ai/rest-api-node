const contentType = (req, reply, payload, done) => {
  if (req.url.startsWith('/api/') && !reply.hasHeader('content-type')) {
    reply.type('application/json; charset=utf-8');
  }

  done(null, payload);
};

module.exports = { contentType };
