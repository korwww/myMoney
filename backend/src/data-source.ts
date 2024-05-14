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
import { Comment } from './entity/comments.entity';
import { Report } from './entity/report_content.entity';
import { ReviewImg } from './entity/review_img.entity';
import { Category } from './entity/category.entity';

export const AppDataSource = new DataSource({
  type: 'mariadb',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,

  entities: [User, Like, Review, ReviewImg, Category, Comment, Report],
  synchronize: true,
});