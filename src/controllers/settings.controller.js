const { User } = require("../models");

const getSettings = async (req, reply) => {
  const { email } = req.user.payload;

  try {
    const user = await User.findOne({ email });

    reply.send({
      google: {
        connect: Boolean(user.google.tokens),
        selectedCalendars: user.google?.calendarIds || [],
      },
      jira: user.jira,
    });
  } catch (error) {
    reply.status(500).send(error);
  }
};

const saveSettings = async (req, reply) => {
  const settings = req.body;
  const { email } = req.user.payload;

  try {
    const user = await User.findOne({ email });

    user.google.calendarIds = settings.googleCalendars;
    user.jira = {
      url: settings.jiraUrl,
      apiKey: settings.jiraApiKey,
      issueKey: settings.jiraIssueKey,
    };

    await user.save();

    reply.send({ settings });
  } catch (error) {
    reply.status(500).send(error);
  }
};

module.exports = { saveSettings, getSettings };
