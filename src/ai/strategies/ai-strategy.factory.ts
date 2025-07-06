import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AISettings } from '../../settings/entities';
import { AIStrategy, Strategies, ProviderType, AIConfig } from '../types';
import { AI_MODELS, DEFAULT_PROVIDER } from '../constants';
import { OpenRouterStrategy } from './openrouter.strategy';
import { TogetherStrategy } from './together.strategy';

@Injectable()
export class AIStrategyFactory implements OnModuleInit {
  private strategies: Strategies = new Map();

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    this.registerStrategies();
  }

  private registerStrategies() {
    const aiConfig = this.configService.get<AIConfig>('ai');

    this.strategies.set(
      'openrouter',
      (opts) => new OpenRouterStrategy(aiConfig?.openRouterApiKey || '', opts),
    );

    this.strategies.set(
      'together',
      (opts) => new TogetherStrategy(aiConfig?.togetherAiApiKey || '', opts),
    );
  }

  getStrategy(settings: AISettings): AIStrategy {
    const provider = settings.provider || DEFAULT_PROVIDER;
    const llm = settings.llm || AI_MODELS[DEFAULT_PROVIDER].models[0];
    const strategyFactory = this.strategies.get(provider as ProviderType);

    if (!strategyFactory) {
      throw new Error(`No strategy found for provider: ${provider}`);
    }

    const strategy = strategyFactory({ llm });
    strategy.initializeClient();

    return strategy;
  }
}
