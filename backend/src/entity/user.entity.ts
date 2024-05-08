import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ comment: '비밀번호' })
  password!: string;

  @Column({ comment: '이메일', unique: true })
  email!: string;

  @Column({ comment: '닉네임', unique: true })
  nickname!: string;

  @Column({
    type: 'timestamp',
    comment: '정지 종료 날짜',
    default: () => 'CURRENT_TIMESTAMP - INTERVAL 1 DAY',
  })
  expired_date!: Date;

  @Column({
    comment: '관리자, 일반 유저 구분',
    default: false,
  })
  isAdmin!: boolean;

  @Column({
    comment: '신고 횟수',
    default: 0,
  })
  report_count!: number;
}
