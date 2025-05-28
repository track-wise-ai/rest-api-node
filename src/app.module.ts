import { Module } from '@nestjs/common';
import { TypeOrmModule, type TypeOrmModuleOptions } from '@nestjs/typeorm';
import { RootController } from './root/root.controller';
import { SettingsModule } from './settings/settings.module';
import { GoogleModule } from './google/google.module';
import { AuthModule } from './auth/auth.module';
import { AiModule } from './ai/ai.module';
import { JiraModule } from './jira/jira.module';

const pgOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'pass123',
  database: 'track-wise',
  autoLoadEntities: true,
  synchronize: true,
};

@Module({
  imports: [
    TypeOrmModule.forRoot(pgOptions),
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
