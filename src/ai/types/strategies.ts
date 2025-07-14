import { AI_MODELS } from '../constants';
import { AiGenerateEventsDto } from '../dto';

export interface AIStrategy {
  initializeClient(): void;
  chat(events: AiGenerateEventsDto['events']): Promise<string>;
  buildPrompt(events: AiGenerateEventsDto['events']): string;
}

export type ProviderType = keyof typeof AI_MODELS;

export type Options = {
  llm: string;
  fineTuning: string;
};

export type Strategies = Record<ProviderType, (opts: Options) => AIStrategy>;
