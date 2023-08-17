import dotenv from "dotenv";

dotenv.config();

export const envConfig = {
  PORT: +(process.env.PORT || 8080),
  JWT_SECRET: process.env.JWT_SECRET || "mysecret",
  JWT_TIME: "1d",
  DB_TYPE: "postgres",
  DB_HOST: process.env.DB_HOST,
  DB_PORT: +(process.env.DB_PORT || 5432),
  DB_USERNAME: process.env.DB_USERNAME,
  DB_DATABASE: process.env.DB_DATABASE,
  DB_PASSWORD: process.env.DB_PASSWORD,
};
