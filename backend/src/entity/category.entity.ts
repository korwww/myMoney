import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ comment: '카테고리 이름', type: 'varchar', length: 50 })
  name!: string;
}
