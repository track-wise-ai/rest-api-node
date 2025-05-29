import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RootController } from './root/root.controller';
import { SettingsModule } from './settings/settings.module';
import { GoogleModule } from './google/google.module';
import { AuthModule } from './auth/auth.module';
import { AiModule } from './ai/ai.module';
import { JiraModule } from './jira/jira.module';
import {
  aiConfig,
  dbConfig,
  jwtConfig,
  appConfig,
  googleConfig,
} from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig, dbConfig, aiConfig, jwtConfig, googleConfig],
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.string().required(),
        DATABASE_PORT: Joi.number().default(5432),
        DATABASE_USER: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        autoLoadEntities: true,
        synchronize: true,
        ...configService.get<TypeOrmModuleAsyncOptions>('db'),
      }),
    }),
    AuthModule,
    GoogleModule,
    SettingsModule,
    AiModule,
    JiraModule,
  ],
  providers: [],
  controllers: [RootController],
})
export class AppModule {}
