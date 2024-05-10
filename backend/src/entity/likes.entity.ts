import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './users.entity';
import { Review } from './reviews.entity';

@Entity('likes')
export class Like {
  @Column({ comment: '유저 아이디' })
  userId!: number;

  @Column({ comment: '좋아요한 리뷰 아이디' })
  reviewId!: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ManyToOne(() => Review)
  @JoinColumn({ name: 'review_id' })
  review!: Review;
}
