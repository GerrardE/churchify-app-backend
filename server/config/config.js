import { config } from "dotenv";

config();

export const development = {
  username: process.env.DEV_POSTGRES_USER,
  password: process.env.DEV_POSTGRES_PASSWORD || "",
  database: process.env.DEV_POSTGRES_DB,
  host: process.env.DEV_POSTGRES_HOST,
  port: process.env.DEV_POSTGRES_PORT,
  dialect: "postgres",
};

export const test = {
  username: process.env.TEST_POSTGRES_USER,
  password: process.env.TEST_POSTGRES_PASSWORD || "",
  database: process.env.TEST_POSTGRES_DB,
  host: process.env.TEST_POSTGRES_HOST,
  port: process.env.TEST_POSTGRES_PORT,
  dialect: "postgres",
};

export const production = {
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD || "",
  database: process.env.POSTGRES_DB,
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  // use_env_variable: 'DATABASE_URL',
  dialect: "postgres",
  dialectOptions: {
    ssl: false,
  },
  logging: false
};
