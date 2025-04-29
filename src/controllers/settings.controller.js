const { User } = require("../models");

const saveSettings = async (req, reply) => {
  const settings = req.body;
  const { email } = req.user.payload;

  try {
    const user = await User.findOne({ email });

    user.google.calendarIds = settings.googleCalendars;

    await user.save();

    reply.send({ settings });
  } catch (error) {
    reply.status(500).send(error);
  }
};

module.exports = { saveSettings };
