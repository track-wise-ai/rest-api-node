const { buildPrompt } = require("./utils");

class AbstractAIService {
  apiKey = "";

  constructor(apiKey) {
    if (this.constructor === AbstractAIService) {
      throw new Error("AIService cannot be instantiated directly");
    }

    this.apiKey = apiKey;
    this.init();
  }

  init() {
    throw new Error("Method 'init' must be implemented");
  }

  async chat(prompt, options = {}) {
    throw new Error("Method 'chat' must be implemented");
  }

  buildPrompt = buildPrompt;
}

module.exports = { AbstractAIService };
