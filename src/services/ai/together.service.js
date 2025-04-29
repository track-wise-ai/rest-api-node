const Together = require("together-ai");
const { AbstractAIService } = require("./abstract-ai.service");

class TogetherService extends AbstractAIService {
  constructor() {
    super(process.env.TOGETHER_AI_API_KEY);
  }

  init() {
    this.client = new Together({
      apiKey: this.apiKey,
    });
  }

  async chat(prompt, options = {}) {
    try {
      const result = await this.client.chat.completions.create({
        model: "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free",
        // model: "meta-llama/Llama-Vision-Free",
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

      console.log(">>> service:together:", { result });

      return result;
    } catch (error) {
      console.log(">>> service:together:catch:", JSON.stringify(error, null, 4));
      throw new Error("Failed to generate text with Together");
    }
  }
}

module.exports = { TogetherService };
