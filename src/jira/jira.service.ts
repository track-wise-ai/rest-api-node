import { Injectable } from '@nestjs/common';

@Injectable()
export class JiraService {
  syncTrackLog() {
    return 'jira:track-log';
  }
}
