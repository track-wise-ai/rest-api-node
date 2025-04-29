module.exports = {
  ...require("./openai.service"),
  ...require("./open-router.service"),
  ...require("./anthropic.service"),
  ...require("./together.service"),
};
