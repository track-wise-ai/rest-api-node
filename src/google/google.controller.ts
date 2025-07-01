import { Get, Controller, UnauthorizedException } from '@nestjs/common';
import { ActiveUser } from '../iam/decorators';
import { type ActiveUserData } from '../iam/interfaces';
import { GoogleAuthUserFactory } from '../iam/authentication/social/google-auth-user.factory';
import { GoogleService } from './google.service';
import { User } from '../users/entities';

@Controller('/google')
export class GoogleController {
  constructor(
    private readonly googleService: GoogleService,
    private readonly googleAuthUserFactory: GoogleAuthUserFactory,
  ) {}

  @Get('/events')
  getEvents() {
    return [];
  }

  @Get('/calendars')
  async getCalendars(@ActiveUser('sub') userId: User['id']) {
    try {
      const googleAuth = await this.googleAuthUserFactory.createForUser(userId);
      return this.googleService.getCalendars(googleAuth);
    } catch {
      throw new UnauthorizedException('Please re-authenticate with Google');
    }
  }

  @Get('/auth-link')
  getAuthLink(@ActiveUser() user: ActiveUserData) {
    return this.googleService.getAuthLink(user.sub);
  }
}
