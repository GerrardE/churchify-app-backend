import dotenv from "dotenv";

dotenv.config();

const {
  DEV_POSTGRES_USER,
  DEV_POSTGRES_PASSWORD,
  DEV_POSTGRES_DB,
  DEV_POSTGRES_HOST,
  DEV_POSTGRES_PORT,

  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_HOST,
  POSTGRES_PORT,

  TEST_POSTGRES_USER,
  TEST_POSTGRES_PASSWORD,
  TEST_POSTGRES_DB,
  TEST_POSTGRES_HOST,
  TEST_POSTGRES_PORT,

  DATABASE_URL,
} = process.env;

export const development = {
  username: DEV_POSTGRES_USER,
  password: DEV_POSTGRES_PASSWORD || "",
  database: DEV_POSTGRES_DB,
  host: DEV_POSTGRES_HOST,
  port: DEV_POSTGRES_PORT,
  dialect: "postgres",
};

export const test = {
  username: TEST_POSTGRES_USER,
  password: TEST_POSTGRES_PASSWORD || "",
  database: TEST_POSTGRES_DB,
  host: TEST_POSTGRES_HOST,
  port: TEST_POSTGRES_PORT,
  dialect: "postgres",
};

export const production = {
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD || "",
  database: POSTGRES_DB,
  host: POSTGRES_HOST,
  port: POSTGRES_PORT,
  // use_env_variable: "DATABASE_URL",
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: false,
      rejectUnauthorized: false
    }
  },
  logging: false
};
