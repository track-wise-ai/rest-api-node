const {
  OpenAIService,
  TogetherService,
  AnthropicService,
  OpenRouterService,
} = require("../services");
const { AI_MODELS } = require("../constants");

// const aiService = new OpenAIService();
const aiService = new OpenRouterService();
// const aiService = new AnthropicService();
// const aiService = new TogetherService();

const root = async (req, reply) => {
  try {
    reply.send({ models: AI_MODELS });
  } catch (error) {
    reply.status(500).send(error);
  }
};

const generate = async (req, reply) => {
  try {
    const { model, events } = req.body;
    const prompt =  aiService.buildPrompt(events);
    const result = await aiService.chat(prompt, { model });

    reply.send(result);
  } catch (error) {
    reply.status(500).send(error);
  }
};

const settings = async (req, reply) => {
  try {
    const prompt = "write a haiku about ai";
    const result = await aiService.chat(prompt);

    reply.send({
      connect: true,
      result,
    });
  } catch (error) {
    reply.status(500).send(error);
  }
};

module.exports = { root, generate, settings };
