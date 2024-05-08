import * as dotenv from 'dotenv';
dotenv.config();

export const PORT = parseInt(process.env.PORT || '3031');
export const DB_HOST = process.env.DB_HOST;
export const DB_PORT = parseInt(process.env.DB_PORT || '3306');
export const DB_DATABASE = process.env.DB_DATABASE;
export const DB_USERNAME = process.env.DB_USERNAME;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS!, 10) || 10;
export const TOKEN_PRIVATE_KEY = process.env.TOKEN_PRIVATE_KEY;
