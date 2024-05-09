import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './users.entity';
import { Category } from './category.entity';

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
  created_at!: Date;

  @Column({ comment: '인증 여부', type: 'boolean', default: false })
  verified!: boolean;

  @Column({ comment: '인증용 사진', type: 'text' })
  receipt_img!: string;
}
