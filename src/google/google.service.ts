import { randomUUID } from 'node:crypto';
import { google, Auth } from 'googleapis';
import { Injectable } from '@nestjs/common';
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

  async getCalendars(auth: Auth.OAuth2Client) {
    const calendar = google.calendar({ version: 'v3', auth });
    const calendarList = await calendar.calendarList.list();

    return calendarList.data.items;
  }
}
