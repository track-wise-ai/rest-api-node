import { Get, Controller } from '@nestjs/common';
import { ActiveUser } from '../iam/decorators/active-user.decorators';
import { type ActiveUserData } from '../iam/interfaces';
import { GoogleService } from './google.service';

@Controller('/google')
export class GoogleController {
  constructor(private readonly googleService: GoogleService) {}

  @Get('/events')
  getEvents() {
    return [];
  }

  @Get('/calendars')
  getCalendars(@ActiveUser() user: ActiveUserData) {
    return this.googleService.getCalendars(user.sub);
  }

  @Get('/auth-link')
  getAuthLink(@ActiveUser() user: ActiveUserData) {
    return this.googleService.getAuthLink(user.sub);
  }
}
