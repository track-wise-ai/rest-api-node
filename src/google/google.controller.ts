import { Get, Query, Controller, UnauthorizedException } from '@nestjs/common';
import { Auth } from 'googleapis';
import { ActiveUser } from '../iam/decorators';
import { type ActiveUserData } from '../iam/interfaces';
import { GoogleAuthUserFactory } from '../iam/authentication/social/google-auth-user.factory';
import { GoogleService } from './google.service';
import { User } from '../users/entities';
import { EventsQueryDto } from './dto/events-query.dto';

@Controller('/google')
export class GoogleController {
  constructor(
    private readonly googleService: GoogleService,
    private readonly googleAuthUserFactory: GoogleAuthUserFactory,
  ) {}

  @Get('/auth-link')
  getAuthLink(@ActiveUser() user: ActiveUserData) {
    return this.googleService.getAuthLink(user.sub);
  }

  @Get('/calendars')
  async getCalendars(@ActiveUser('sub') userId: User['id']) {
    let googleAuth: Auth.OAuth2Client;

    try {
      googleAuth = await this.googleAuthUserFactory.createForUser(userId);
    } catch {
      throw new UnauthorizedException('Please re-authenticate with Google');
    }

    return this.googleService.getCalendars(googleAuth);
  }

  @Get('/events')
  async getEvents(
    @ActiveUser('sub') userId: User['id'],
    @Query() queryParams: EventsQueryDto,
  ) {
    let googleAuth: Auth.OAuth2Client;

    try {
      googleAuth = await this.googleAuthUserFactory.createForUser(userId);
    } catch {
      throw new UnauthorizedException('Please re-authenticate with Google');
    }

    return this.googleService.getEvents(userId, googleAuth, queryParams);
  }
}
