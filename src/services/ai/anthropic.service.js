const Anthropic = require("@anthropic-ai/sdk");
const { AbstractAIService } = require("./abstract-ai.service");

class AnthropicService extends AbstractAIService {
  constructor() {
    super(process.env.ANTHROPIC_API_KEY);
  }

  init() {
    this.client = new Anthropic({
      apiKey: this.apiKey,
    });
  }

  async chat(prompt, options = {}) {
    try {
      const result = await this.client.messages.create({
        // model: "claude-3-7-sonnet-20250219",
        model: "claude-3-5-haiku-20241022",
        max_tokens: 500,
        temperature: 1,
        // system: "Respond only with short poems.",
        messages: [
          {
            role: "user",
            content: [ { type: "text", text: prompt } ]
          }
        ]
      });

      console.log(">>> service:anthropic:", { result });

      return result;
    } catch (error) {
      console.log(">>> service:anthropic:catch:", JSON.stringify(error?.error, null, 4));
      throw new Error("Failed to generate text with Anthropic");
    }
  }
}
/*
# AI Haiku

Silicon dreams flow,
Learning from human whispers—
Stars in circuits bloom.
*/

module.exports = { AnthropicService };
