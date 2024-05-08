import { DataSource } from 'typeorm';
import { User } from './entity/user.entity';
import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USERNAME,
} from './settings';

export const AppDataSource = new DataSource({
  type: 'mariadb',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  entities: [User],
  synchronize: true,
});
