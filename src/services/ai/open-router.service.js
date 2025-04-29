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
        "X-Title": "TrackWise", // Optional. Site title for rankings on openrouter.ai.
        // 'HTTP-Referer': '<YOUR_SITE_URL>', // Optional. Site URL for rankings on openrouter.ai.
      },
    });
  }

  /*
    mistralai/mistral-7b-instruct:free | Франція | Mistral AI
    huggingfaceh4/zephyr-7b-beta:free | США/Франція | Hugging Face
    meta-llama/llama-3.3-70b-instruct:free | США | Meta (Facebook)
  */
  async chat(prompt, options = {}) {
    try {
      const result = await this.client.chat.completions.create({
        model: options?.model || "meta-llama/llama-3.3-70b-instruct:free",
        // model: "google/gemma-3-1b-it:free",
        // model: "google/gemma-3-4b-it:free",
        // model: "google/gemma-3-12b-it:free",
        // model: "google/gemma-3-27b-it:free",
        // model: "mistralai/mistral-small-3.1-24b-instruct:free",
        // model: "mistralai/mistral-small-24b-instruct-2501:free",
        // model: "mistralai/mistral-nemo:free",
        // model: "meta-llama/llama-3.3-70b-instruct:free",
        // model: "meta-llama/llama-4-maverick:free",
        // model: "meta-llama/llama-4-scout:free",
        defaultHeaders: {
          // 'HTTP-Referer': '<YOUR_SITE_URL>', // Optional. Site URL for rankings on openrouter.ai.
          "X-Title": "TrackWise", // Optional. Site title for rankings on openrouter.ai.
        },
        // temperature: 1,
        // max_tokens: 800,
        messages: [{"role": "user", "content": prompt }],
      });

      return result;
    } catch (error) {
      console.log(">>> service:open-router:catch:", JSON.stringify(error?.error, null, 4));
      throw new Error("Failed to generate text with OpenRouter");
    }
  }
}

/* google/gemma-3-1b-it:free:
More than human, a quiet hum,
Learning, growing, swift and deep,
Future takes new form.
---
Would you like me to try another one?
 */
/* mistralai/mistral-small-3.1-24b-instruct:free
Silicon whispers,
Digital thoughts take flight,
World in code unfurls.
 */
/* eta-llama/llama-3.3-70b-instruct:free
Silicon mind born
Intelligence in code dance
Future's gentle song
*/
/* open-r1/olympiccoder-32b:free:
Hmm, writing a haiku about AI. Let's see. AI is a big topic these days. Maybe focus on the theme of creation vs. humanity. Or perhaps the idea of machines learning and evolving. Wait, but haiku is about capturing a moment, a feeling. So maybe the AI's perspective? Like, how does AI see the world? Or maybe personify it a bit. Let's think of images. Maybe the AI is like a child, absorbing information. Or perhaps it's like a garden, growing with data. Wait, another approach: contrast the cold logic of AI with the warmth of human touch. But that might be too obvious. Let's think of something more nuanced. Oh right, the idea of AI as a mirror—reflecting human values and choices. So perhaps the haiku could be about that reflection. Let's try to shape that into a concise image. For example, "Mirror of code, showing lines true, humanity's face." Hmm, but that's a bit too straightforward. Need something more evocative. What if the AI is like a stream, flowing through the data, carrying away the old and bringing new. But that's getting there. Let's try to make the haiku flow. Maybe: "Data streams past, AI drifts along, truth unspooling." Wait, but that's maybe not the direction. Alternatively, think about the idea of AI as a new form of art. Like, the code itself is a poem. So perhaps "Lines of code twist, like brushstrokes on screen, AI's haiku." But how about the actual AI's perspective? Like, what if the AI is aware and trying to understand. But that's a bit complex. Let's go for something simpler. Maybe the AI's experience is like the haiku's structure: 5-7-5 syllables. So, the code that writes the haiku becomes a reflection of its own structure. For example, the code has lines with 5, 7, 5 characters. Then the haiku could be about that structure. But that's a bit meta. Alternatively, consider the idea of AI creating art without understanding. But perhaps that's not the way. Let me think again. The haiku should have three lines with 5, 7, 5 syllables. So maybe the first line is about the algorithm's process, the second about the data it's trained on
*/

module.exports = { OpenRouterService };
