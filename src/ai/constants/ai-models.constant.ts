export const AI_MODELS = {
  anthropic: {
    title: 'Anthropic',
    models: ['claude-3-5-haiku-20241022', 'claude-3-7-sonnet-20250219'],
  },
  openrouter: {
    title: 'OpenRouter',
    models: [
      'google/gemma-3-1b-it:free',
      'google/gemma-3-4b-it:free',
      'google/gemma-3-12b-it:free',
      'google/gemma-3-27b-it:free',
      'mistralai/mistral-small-3.1-24b-instruct:free',
      'mistralai/mistral-small-24b-instruct-2501:free',
      'mistralai/mistral-nemo:free',
      'meta-llama/llama-3.3-70b-instruct:free',
      'meta-llama/llama-4-maverick:free',
      'meta-llama/llama-4-scout:free',
    ],
  },
  microsoft: {
    title: 'Microsoft',
    models: [
      'microsoft/mai-ds-r1:free',
      'microsoft/phi-4-reasoning-plus:free',
      'microsoft/phi-4-reasoning:free',
    ],
  },
  openai: {
    title: 'OpenAI',
    models: ['gpt-3.5-turbo', 'gpt-4o'],
  },
  together: {
    title: 'Together AI',
    models: [
      'meta-llama/Llama-3.3-70B-Instruct-Turbo-Free',
      'meta-llama/Llama-Vision-Free',
    ],
  },
} as const;
