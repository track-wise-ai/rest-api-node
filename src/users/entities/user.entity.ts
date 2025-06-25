import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { RefreshToken } from '../../iam/authentication/entities';
import {
  AISettings,
  JiraSettings,
  GoogleCalendarSettings,
} from '../../settings/entities';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToOne(() => RefreshToken, (refreshToken) => refreshToken.user)
  refreshTokens: RefreshToken[];

  @OneToOne(() => GoogleCalendarSettings, (settings) => settings.user)
  googleCalendarSettings: GoogleCalendarSettings;

  @OneToOne(() => AISettings, (settings) => settings.user)
  aiSettings: AISettings;

  @OneToOne(() => JiraSettings, (settings) => settings.user)
  jiraSettings: JiraSettings;
}
