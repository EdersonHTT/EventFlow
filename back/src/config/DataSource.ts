import "reflect-metadata";
import * as dotenv from "dotenv";
import { DataSource } from "typeorm";
import { number } from "zod";

dotenv.config();

const { DB_NAME, DB_PORT, DB_USER, DB_PASSWORD, DB_HOST } = process.env;

export const AppDataSource = new DataSource({
    type: "mysql",
    database: DB_NAME,
    port: Number(DB_PORT),
    username: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    logging: true,
    synchronize: true,
    entities: ["src/models/*.ts"],
})