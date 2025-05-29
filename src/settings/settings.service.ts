import { Injectable } from '@nestjs/common';

@Injectable()
export class SettingsService {
  getSettings() {
    return 'settings:get';
  }

  updateSettings() {
    return 'settings:post';
  }
}
