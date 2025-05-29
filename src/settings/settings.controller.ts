import { Get, Post, Controller } from '@nestjs/common';
import { SettingsService } from './settings.service';

@Controller('/settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}
  @Get()
  getSettings() {
    return this.settingsService.getSettings();
  }

  @Post()
  updateSettings() {
    return this.settingsService.updateSettings();
  }
}
