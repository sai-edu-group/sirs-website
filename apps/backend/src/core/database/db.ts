import { Kysely, MysqlDialect } from "kysely";
import { createPool, type PoolOptions } from "mysql2";

import type { Database } from "./schema";

type GlobalWithDatabase = typeof globalThis & {
  __sirsDatabase?: Kysely<Database>;
};

const DEFAULT_DB_PORT = 3306;
const DEFAULT_CONNECTION_LIMIT = 10;

function getRequiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required database environment variable: ${name}`);
  }

  return value;
}

function getDatabasePort(): number {
  const port = Number(process.env.DB_PORT ?? DEFAULT_DB_PORT);

  if (!Number.isInteger(port) || port <= 0) {
    throw new Error("DB_PORT must be a positive integer");
  }

  return port;
}

function createDatabaseConnection(): Kysely<Database> {
  const poolOptions: PoolOptions = {
    host: getRequiredEnv("DB_HOST"),
    user: getRequiredEnv("DB_USER"),
    password: getRequiredEnv("DB_PASSWORD"),
    database: getRequiredEnv("DB_NAME"),
    port: getDatabasePort(),
    connectionLimit: DEFAULT_CONNECTION_LIMIT,
  };

  const dialect = new MysqlDialect({
    pool: createPool(poolOptions),
  });

  return new Kysely<Database>({ dialect });
}

const globalWithDatabase = globalThis as GlobalWithDatabase;

export const db = globalWithDatabase.__sirsDatabase ?? createDatabaseConnection();

globalWithDatabase.__sirsDatabase = db;

export type Db = Kysely<Database>;
