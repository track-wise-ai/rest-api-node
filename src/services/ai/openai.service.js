const OpenAI = require("openai");
const { AbstractAIService } = require("./abstract-ai.service");

/** @see https://platform.openai.com/docs/overview */
class OpenAIService extends AbstractAIService {
  constructor() {
    super(process.env.OPENAI_API_KEY);
  }

  init() {
    this.client = new OpenAI({
      apiKey: this.apiKey,
    });
  }

  async chat(prompt, options = {}) {
    try {
      const result = await this.client.chat.completions.create({
        model: "gpt-3.5-turbo",
        max_tokens: 500,
        messages: [{"role": "user", "content": prompt }],
      });

      console.log(">>> service:openai:", { result });

      return result;
    } catch (error) {
      console.log(">>> service:openai:catch:", JSON.stringify(error?.error, null, 4));
      throw new Error("Failed to generate text with OpenAI");
    }
  }
}

module.exports = { OpenAIService };
