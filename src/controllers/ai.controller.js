const { User } = require("../models");
const {
  OpenAIService,
  TogetherService,
  AnthropicService,
  OpenRouterService,
} = require("../services");

// const aiService = new OpenAIService();
const aiService = new OpenRouterService();
// const aiService = new AnthropicService();
// const aiService = new TogetherService();

const generate = async (req, reply) => {
  const { email } = req.user.payload;

  try {
    const user = await User.findOne({ email });

    const { events } = req.body;
    const prompt =  aiService.buildPrompt(events);
    const result = await aiService.chat(prompt, { model: user?.ai?.selectedModel });

    reply.send(result);
  } catch (error) {
    reply.status(500).send(error);
  }
};

module.exports = { generate };
