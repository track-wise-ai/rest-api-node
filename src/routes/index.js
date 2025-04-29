const { routes: userRoutes } = require("./user.routes");
const { routes: authRoutes } = require("./auth.routes");
const { routes: rootRoutes } = require("./root.routes");
const { routes: systemRoutes } = require("./system.routes");
const { routes: googleRoutes } = require("./google.routes");
const { routes: settingsRoutes } = require("./settings.routes");
const { routes: aiRoutes } = require("./ai.routes");

module.exports = {
  aiRoutes,
  userRoutes,
  authRoutes,
  rootRoutes,
  systemRoutes,
  googleRoutes,
  settingsRoutes,
};
