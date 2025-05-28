import { Get, Post, Controller } from '@nestjs/common';

@Controller('settings')
export class SettingsController {
  @Get()
  getSettings() {
    return 'settings:get';
  }

  @Post()
  updateSettings() {
    return 'settings:post';
  }
}
