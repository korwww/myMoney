import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Review } from './reviews.entity';

@Entity('review_img')
export class ReviewImg {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Review, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'review_id' })
  review!: Review;

  @Column({ comment: '사진 데이터', type: 'text' })
  image!: string;
}