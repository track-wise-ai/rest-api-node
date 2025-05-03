const { User } = require("../models");
const { JiraService } = require("../services");

const jiraService = new JiraService();

const syncTrackLog = async (req, reply) => {
  const { trackLog } = req.body;
  const { email } = req.user.payload;

  try {
    const user = await User.findOne({ email });
    const { url, apiKey, issueKey } = user.jira || {};
    const parsedTrackLog = JSON.parse(trackLog);
    const worklogs = Array.isArray(parsedTrackLog) ? parsedTrackLog : [];

    jiraService.init(url, apiKey);
    await Promise.all(worklogs.map((workLog) => {
      return jiraService.addWorkLog(issueKey, workLog);
    }));

    reply.send({ success: true });
  } catch (error) {
    reply.status(500).send(error);
  }
};

module.exports = { syncTrackLog };
