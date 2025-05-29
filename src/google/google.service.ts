import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleService {
  constructor(private readonly configService: ConfigService) {}

  authCallback() {
    return 'google:callback';
  }

  getEvents() {
    return 'google:events';
  }

  getCalendars() {
    return 'google:calendars';
  }

  getAuthLink() {
    console.log(this.configService.get('google'));
    return 'google:auth-link';
  }
}
