import {
  IsIn,
  IsUrl,
  IsEmail,
  IsArray,
  IsString,
  IsNotEmpty,
  IsOptional,
  ValidateIf,
} from 'class-validator';
import { JiraAuthType } from '../settings.constants';

export class UpdateSettingsDto {
  @IsString()
  aiModel?: string;

  @IsString()
  aiProvider?: string;

  @IsArray()
  @IsString({ each: true })
  googleCalendars?: string[];

  @IsString()
  @IsOptional()
  jiraApiKey?: string;

  @IsString()
  @IsNotEmpty()
  @IsIn([JiraAuthType.BASIC, JiraAuthType.BEARER])
  jiraAuthType: JiraAuthType.BASIC | JiraAuthType.BEARER;

  @IsEmail()
  @IsOptional()
  jiraEmail?: string;

  @IsString()
  @IsOptional()
  jiraIssueKey?: string;

  @IsUrl()
  @IsOptional()
  @ValidateIf(
    (value: UpdateSettingsDto) => value.jiraAuthType === JiraAuthType.BASIC,
  )
  jiraUrl?: string;
}
