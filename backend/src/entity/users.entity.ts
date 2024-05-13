import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @CreateDateColumn({
    comment: '정지 종료 날짜',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP()',
  })
  expiredDate!: Date;

  @Column({
    comment: '관리자, 일반 유저 구분',
    default: false,
  })
  isAdmin!: boolean;

  @Column({
    comment: '신고 횟수',
    default: 0,
  })
  reportCount!: number;
}
