import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { RootController } from './root/root.controller';
import { SettingsModule } from './settings/settings.module';
import { GoogleModule } from './google/google.module';
import { AuthModule } from './auth/auth.module';
import { AiModule } from './ai/ai.module';
import { JiraModule } from './jira/jira.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.string().required(),
        DATABASE_PORT: Joi.number().default(5432),
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      port: Number(process.env.DATABASE_PORT),
      host: process.env.DATABASE_HOST,
      autoLoadEntities: true,
      synchronize: true,
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
