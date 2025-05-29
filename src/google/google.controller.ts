import { Get, Controller } from '@nestjs/common';
import { GoogleService } from './google.service';

@Controller('/google')
export class GoogleController {
  constructor(private readonly googleService: GoogleService) {}

  @Get('/callback')
  authCallback() {
    return this.googleService.authCallback();
  }

  @Get('/events')
  getEvents() {
    return this.googleService.getEvents();
  }

  @Get('/calendars')
  getCalendars() {
    return this.googleService.getCalendars();
  }

  @Get('/auth-link')
  getAuthLink() {
    return this.googleService.getAuthLink();
  }
}
