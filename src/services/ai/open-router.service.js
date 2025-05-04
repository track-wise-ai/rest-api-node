const OpenAI = require("openai");
const { AbstractAIService } = require("./abstract-ai.service");

/** @see https://openrouter.ai/docs/quickstart */
class OpenRouterService extends AbstractAIService {
  constructor() {
    super(process.env.OPEN_ROUTER_API_KEY);
  }

  init() {
    this.client = new OpenAI({
      apiKey: this.apiKey,
      baseURL: "https://openrouter.ai/api/v1",
      defaultHeaders: {
        "HTTP-Referer": "https://github.com/track-wise-ai", // Optional. Site URL for rankings on openrouter.ai.
        "X-Title": "TrackWise", // Optional. Site title for rankings on openrouter.ai.
      },
    });
  }

  async chat(prompt, options = {}) {
    try {
      const result = await this.client.chat.completions.create({
        model: options?.model || "meta-llama/llama-3.3-70b-instruct:free",
        // temperature: 1,
        // max_tokens: 800,
        messages: [{"role": "user", "content": prompt }],
      });

      return result;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to generate text with OpenRouter");
    }
  }
}

module.exports = { OpenRouterService };
