import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleService {
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
    return 'google:auth-link';
  }
}
