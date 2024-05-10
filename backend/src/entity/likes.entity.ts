import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './users.entity';
import { Review } from './reviews.entity';

@Entity('likes')
export class Like {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ManyToOne(() => Review)
  @JoinColumn({ name: 'review_id' })
  review!: Review;
}
