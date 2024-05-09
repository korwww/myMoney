import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Review } from './review.entity';

@Entity('likes')
export class Like {
  @Column({ comment: '유저 아이디' })
  user_id!: number;

  @Column({ comment: '좋아요한 리뷰 아이디' })
  review_id!: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ManyToOne(() => Review)
  @JoinColumn({ name: 'review_id' })
  review!: Review;
}
