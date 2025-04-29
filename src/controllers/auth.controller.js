const { User } = require("../models");

const signup = async (req, reply) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const user = new User({
      firstName,
      lastName,
      email,
      password,
    });

    await user.save();

    reply.send({ success: true });
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ error: "An arror occured during signup" });
  }
};

const login = async (req, reply) => {
  const fastify = req.server;
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select([
      "firstName",
      "lastName",
      "email",
      "password",
      "role",
    ]);

    if (!user) {
      return reply.status(401).send({ error: "User not found" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return reply.status(401).send({ error: "Invalid password" });
    }

    const token = fastify.jwt.sign({
      payload: {
        email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    });

    reply.send({ token });
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ error: "An arror occured during authentication" });
  }
};

module.exports = { login, signup };
