import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './users.entity';

@Entity('reportContent')
export class Report {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ comment: '신고 카테고리', type: 'varchar', length: 50 })
  name!: string;

  @ManyToOne(() => User, (user) => user.reportContents)
  @JoinColumn({ name: 'userId' })
  user!: User;
}
