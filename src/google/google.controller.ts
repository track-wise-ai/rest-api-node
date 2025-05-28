import { Get, Controller } from '@nestjs/common';

@Controller('google')
export class GoogleController {
  @Get('callback')
  authCallback() {
    return 'google:callback';
  }

  @Get('events')
  getEvents() {
    return 'google:events';
  }

  @Get('/calendars')
  getCalendars() {
    return 'google:calendars';
  }

  @Get('auth-link')
  authLink() {
    return 'google:auth-link';
  }
}
