import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { env } from "../config/env.js";

export const pool = new Pool({
  connectionString: env.DATABASE_URL,

  min: 2,
  max: 10
});

export const db = drizzle(pool);


