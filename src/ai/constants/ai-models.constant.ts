export const AI_MODELS = {
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
  together: {
    title: 'Together AI',
    models: [
      'meta-llama/Llama-3.3-70B-Instruct-Turbo-Free',
      'meta-llama/Llama-Vision-Free',
    ],
  },
} as const;
