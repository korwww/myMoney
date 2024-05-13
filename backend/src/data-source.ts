// import { DataSource } from 'typeorm';
// import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

// import {
//   DB_DATABASE,
//   DB_HOST,
//   DB_PASSWORD,
//   DB_PORT,
//   DB_USERNAME,
// } from './settings';
// import { User } from './entity/users.entity';
// import { Like } from './entity/likes.entity';
// import { Review } from './entity/reviews.entity';

// export const AppDataSource = new DataSource({
//   type: 'mariadb',
//   host: DB_HOST,
//   port: DB_PORT,
//   username: DB_USERNAME,
//   password: DB_PASSWORD,
//   database: DB_DATABASE,
//   entities: [User, Like, Review],
//   synchronize: true,
//   namingStrategy: new SnakeNamingStrategy(),
// });

import { DataSource } from 'typeorm';
import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USERNAME,
} from './settings';
import { User } from './entity/users.entity';
import { Like } from './entity/likes.entity';
import { Review } from './entity/reviews.entity';
import { ReviewImg } from './entity/review_img.entity';
import { Category } from './entity/category.entity';

export const AppDataSource = new DataSource({
  name: 'default', // 연결 이름을 'default'로 설정
  type: 'mariadb',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  entities: [User, Like, Review, ReviewImg, Category],
  synchronize: true,
});