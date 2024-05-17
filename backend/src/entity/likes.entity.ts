import { Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './users.entity';
import { Review } from './reviews.entity';

@Entity('likes')
export class Like {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ManyToOne(() => Review, (review) => review.likes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'review_id' })
  review!: Review;
}
