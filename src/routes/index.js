const { routes: userRoutes } = require("./user.routes");
const { routes: authRoutes } = require("./auth.routes");
const { routes: rootRoutes } = require("./root.routes");
const { routes: googleRoutes } = require("./google.routes");
const { routes: settingsRoutes } = require("./settings.routes");
const { routes: aiRoutes } = require("./ai.routes");
const { routes: jiraRoutes } = require("./jira.routes");

module.exports = {
  aiRoutes,
  jiraRoutes,
  userRoutes,
  authRoutes,
  rootRoutes,
  googleRoutes,
  settingsRoutes,
};
