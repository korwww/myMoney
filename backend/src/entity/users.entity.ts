<<<<<<< Updated upstream
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
=======
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Comment } from './comments.entity';
import { Report } from './report_content.entity';
import { Review } from './reviews.entity';
import { Like } from './likes.entity';
>>>>>>> Stashed changes

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

  @CreateDateColumn({
    comment: '정지 종료 날짜',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP()',
  })
  expiredDate!: Date;

  @Column({
    comment: '관리자, 일반 유저 구분',
    default: false,
  })
  isAdmin!: boolean;

  @Column({
    comment: '신고 횟수',
    default: 0,
  })
<<<<<<< Updated upstream
  reportCount!: number;
=======
  report_count!: number;

  @OneToMany(() => Comment, (comment) => comment.user)
  comments!: Comment[];

  @OneToMany(() => Report, (reportContent) => reportContent.user)
  reportContents!: Report[];

  @OneToMany(() => Review, (review) => review.user)
  reviews!: Review[];

  @OneToMany(() => Like, (like) => like.user)
  likes!: Like[];
>>>>>>> Stashed changes
}
