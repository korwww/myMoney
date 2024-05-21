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
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ManyToOne(() => Review, (review) => review.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'review_id' })
  review!: Review;

  @Column({ comment: '댓글 내용', type: 'varchar', length: 100 })
  content!: string;

  @CreateDateColumn({ comment: '작성 날짜', type: 'timestamp' })
  createdAt!: Date;
}
