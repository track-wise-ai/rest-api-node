import { Post, Controller } from '@nestjs/common';

@Controller('jira')
export class JiraController {
  @Post('/track-log')
  syncTrackLog() {
    return 'jira:track-log';
  }
}
