import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ comment: '비밀번호' })
  password!: string;

  @Column({ comment: '이메일', unique: true, nullable: false })
  email!: string;

  @Column({ comment: '닉네임', unique: true, nullable: false })
  nickname!: string;

  @Column({
    type: 'timestamp',
    comment: '정지 종료 날짜',
    nullable: false,
  })
  expired_date!: Date;

  @Column({
    comment: '관리자, 일반 유저 구분',
    default: false,
  })
  is_admin!: boolean;

  @Column({
    comment: '신고 횟수',
    default: 0,
  })
  report_count!: number;
}
