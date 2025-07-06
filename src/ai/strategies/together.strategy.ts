import Together from 'together-ai';
import { BaseAIStrategy } from './base-ai.strategy';

export class TogetherStrategy extends BaseAIStrategy {
  client: Together;

  initializeClient(): void {
    this.client = new Together({ apiKey: this.apiKey });
  }

  async chat(message: string): Promise<string> {
    try {
      const result = await this.client.chat.completions.create({
        model: this.options.llm,
        max_tokens: 500,
        temperature: 1,
        // system: "Respond only with short poems.",
        messages: [
          {
            role: 'user',
            content: [{ type: 'text', text: message }],
          },
        ],
      });

      return result?.choices[0]?.message?.content || '';
    } catch (error) {
      throw new Error(`Together AI API error: ${error.message}`);
    }
  }
}
