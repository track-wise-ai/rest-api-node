import { randomUUID } from 'node:crypto';
import { google } from 'googleapis';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { GoogleAuthService } from '../iam/authentication/social/google-auth.service';
import { User } from '../users/entities';

@Injectable()
export class GoogleService {
  constructor(private readonly googleAuthService: GoogleAuthService) {}

  async getAuthLink(userId: User['id']) {
    const state = randomUUID();
    const authUrl = await this.googleAuthService.generateAuthUrl(userId, state);

    return { authUrl };
  }

  async getCalendars(userId: User['id']) {
    try {
      await this.googleAuthService.renewCredentials(userId);
    } catch {
      throw new UnauthorizedException(
        'Please re-authenticate with Google to continue',
      );
    }

    const calendar = google.calendar({
      version: 'v3',
      auth: this.googleAuthService.getOAuthClient(),
    });
    const calendarList = await calendar.calendarList.list();
    return calendarList.data.items;
  }
}
