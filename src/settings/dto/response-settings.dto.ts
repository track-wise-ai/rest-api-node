import { AIModels } from '../../ai/types';
import { GoogleCalendar } from '../../google/types';
import { JiraAuthType } from '../settings.constants';

export interface ResponseSettingsDto {
  google: {
    connect: boolean;
    selectedCalendars: Array<GoogleCalendar['id']>;
  };
  ai: {
    models: AIModels;
    selectedModel: string;
  };
  jira: {
    url: string;
    issueKey: string;
    authType: JiraAuthType.BEARER | JiraAuthType.BASIC;
    email: string;
    apiKey: string;
  };
}
