import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SettingsController } from './settings.controller';
import { SettingsService } from './settings.service';
import { User } from '../users/entities';
import { AISettings, JiraSettings, GoogleCalendarSettings } from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      AISettings,
      JiraSettings,
      GoogleCalendarSettings,
    ]),
  ],
  controllers: [SettingsController],
  providers: [SettingsService],
})
export class SettingsModule {}
