import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { User } from './users.entity';

@Entity('report_content')
export class Report {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ comment: '신고 카테고리', type: 'varchar', length: 50 })
  reason!: string;

  @Column({ comment: '신고한 유저 아이디' })
  reporterUserId!: number;

  @CreateDateColumn({ comment: '신고한 날짜' })
  createdAt!: Date;

  @ManyToOne(() => User, (user) => user.reportContents)
  @JoinColumn({ name: 'reported_user_id' })
  user!: User;
}
