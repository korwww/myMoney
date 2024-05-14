import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Report } from './report_content.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ comment: '비밀번호' })
  password!: string;

  @Column({ comment: '이메일', unique: true, nullable: false })
  email!: string;

  @Column({ comment: '닉네임', unique: true, nullable: false })
  nickname!: string;

  @Column({
    comment: '관리자, 일반 유저 구분',
    default: false,
  })
  isAdmin!: boolean;

  @OneToMany(() => Report, (report) => report.user)
  reports!: Report[];
}
