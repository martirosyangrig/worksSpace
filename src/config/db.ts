import { DataSource } from "typeorm";
import { envConfig } from "./env";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: envConfig.DB_HOST,
  port: envConfig.DB_PORT,
  username: envConfig.DB_USERNAME,
  password: envConfig.DB_PASSWORD,
  database: envConfig.DB_DATABASE,
  entities: ["src/entity/**/*{.ts,.js}"],
  migrations: ["src/migrations/**/*{.ts,.js}"],
  synchronize: false,
  logging: false,
});
