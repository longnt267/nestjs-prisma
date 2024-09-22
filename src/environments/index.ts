const dotenv = require('dotenv');
dotenv.config();

const POSTGRES_USERNAME = process.env.POSTGRES_USERNAME || 'postgres';
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || '123456';
const POSTGRES_DATABASE = process.env.POSTGRES_DATABASE || 'postgres';
const POSTGRES_HOST = process.env.POSTGRES_HOST || 'localhost';
const POSTGRES_PORT = process.env.POSTGRES_PORT || '5432';
const DATABASE_URL = `postgres://${POSTGRES_USERNAME}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DATABASE}`;
const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY || 'secret';
export {
  DATABASE_URL,
  TOKEN_SECRET_KEY
};
