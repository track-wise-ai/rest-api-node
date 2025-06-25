import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities';

@Entity('ai_settings')
export class AISettings {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  provider: string;

  @Column({ nullable: true })
  llm: string;

  @OneToOne(() => User, (user) => user.aiSettings, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;
}
