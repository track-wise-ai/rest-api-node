const path = require("node:path");

const ROOT_DIR = __dirname;
const PUBLIC_DIR = path.join(ROOT_DIR, "..", "public");

const isDev = process.env.NODE_ENV === "development";

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const MONGODB_URI = process.env.NODE_ENV === "development"
  ? `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:27017/${DB_NAME}?authSource=admin`
  : process.env.MONGO_DB_URI;

const AI_MODELS = {
  anthropic: {
    title: "Anthropic",
    models: [
      "claude-3-5-haiku-20241022",
      "claude-3-7-sonnet-20250219",
    ],
  },
  openrouter: {
    title: "OpenRouter",
    models: [
      // "google/gemma-3-1b-it:free",
      "google/gemma-3-4b-it:free",
      "google/gemma-3-12b-it:free",
      "google/gemma-3-27b-it:free",
      "mistralai/mistral-small-3.1-24b-instruct:free",
      "mistralai/mistral-small-24b-instruct-2501:free",
      "mistralai/mistral-nemo:free",
      "meta-llama/llama-3.3-70b-instruct:free",
      "meta-llama/llama-4-maverick:free",
      "meta-llama/llama-4-scout:free",
    ],
  },
  openai: {
    title: "OpenAI",
    models: [
      "gpt-3.5-turbo",
      "gpt-4o",
    ],
  },
  together: {
    title: "Together AI",
    models: [
      "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free",
      "meta-llama/Llama-Vision-Free",
    ],
  },
};

module.exports = {
  isDev,
  ROOT_DIR,
  AI_MODELS,
  PUBLIC_DIR,
  MONGODB_URI,
};
