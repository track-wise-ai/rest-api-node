import { AI_MODELS } from '../constants';

export interface AIStrategy {
  initializeClient(): void;
  chat(messages: string, options?: any): Promise<string>;
  buildPrompt(events: any[]): string;
}

export type ProviderType = keyof typeof AI_MODELS;

export type Options = {
  llm: string;
};

export type Strategies = Map<ProviderType, (opts: Options) => AIStrategy>;
