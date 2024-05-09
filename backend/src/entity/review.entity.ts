import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ comment: '제목', type: 'varchar', length: 100 })
  title!: string;

  @Column({ comment: '작성 내용', type: 'text' })
  content!: string;

  @Column({ comment: '별점', type: 'decimal', default: 1 })
  stars!: number;

  @Column({ comment: '작성 날짜', type: 'timestamp' })
  created_at!: Date;

  @Column({ comment: '인증 여부', default: false })
  verified!: boolean;

  @Column({ comment: '인증용 사진', type: 'text' })
  receipt_img!: string;
}
