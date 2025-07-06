import { Injectable } from '@nestjs/common';
import { AIStrategy, Options } from '../types';
import { buildPrompt } from './buildPrompt';

@Injectable()
export abstract class BaseAIStrategy implements AIStrategy {
  constructor(
    readonly apiKey: string,
    readonly options: Options,
  ) {
    if (!this.apiKey) {
      throw new Error('API key is required');
    }
  }

  abstract initializeClient(): void;

  abstract chat(message: string): Promise<string>;

  buildPrompt = buildPrompt;
}
