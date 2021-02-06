import { config } from 'dotenv';

config();

export const development = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  dialect: 'postgres',
};

export const test = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_TESTDATABASE,
  host: process.env.DB_HOST,
  dialect: 'postgres'
};

export const production = {
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD || '',
  database: process.env.POSTGRES_DATABASE,
  host: process.env.POSTGRES_HOST,
  // use_env_variable: 'DATABASE_URL',
  dialect: 'postgres',
  dialectOptions: {
    ssl: false,
  },
  logging: false
};
