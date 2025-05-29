import { Post, Controller } from '@nestjs/common';
import { JiraService } from './jira.service';

@Controller('/jira')
export class JiraController {
  constructor(private readonly jiraService: JiraService) {}

  @Post('/track-log')
  syncTrackLog() {
    return this.jiraService.syncTrackLog();
  }
}
