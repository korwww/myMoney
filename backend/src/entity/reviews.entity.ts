import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './users.entity';
import { Category } from './category.entity';
import { ReviewImg } from './review_img.entity';
import { Like } from './likes.entity';
import { Comment } from './comments.entity';

@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category!: Category;

  @OneToMany(() => Like, (like) => like.review)
  likes!: Like[];

  @OneToMany(() => Comment, (comment) => comment.review)
  comments!: Comment[];

  @Column({ comment: '제목', type: 'varchar', length: 100 })
  title!: string;

  @Column({ comment: '작성 내용', type: 'text' })
  content!: string;

  @Column({
    comment: '별점',
    type: 'tinyint',
    unsigned: true,
    default: 1,
  })
  stars!: number;

  @CreateDateColumn({ comment: '작성 날짜', type: 'timestamp' })
  createdAt!: Date;

  @Column({ comment: '인증 여부', type: 'boolean', default: () => 'false' })
  verified!: boolean;

  @Column({ comment: '인증용 사진', type: 'text', nullable: true })
  receiptImg!: string;

  @OneToMany(() => ReviewImg, (reviewImg) => reviewImg.review)
  reviewImgs!: ReviewImg[];
}
