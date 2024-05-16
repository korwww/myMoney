import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './users.entity';
import { Review } from './reviews.entity';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: 'userId' })
  user!: User;

  @ManyToOne(() => Review, (review) => review.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'reviewId' })
  review!: Review;

  @Column({ comment: '댓글 내용', type: 'varchar', length: 100 })
  content!: string;

  @CreateDateColumn({ comment: '작성 날짜', type: 'timestamp' })
  createdAt!: Date;
}
