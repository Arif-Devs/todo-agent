import type { Config } from "drizzle-kit";
import "dotenv/config";


const databaseUrl = process.env.NODE_ENV === "test"?process.env.TEST_DATABASE_URL!:process.env.DATABASE_URL

if(!databaseUrl) throw new Error("database url is not defined")

export default {
  schema: "./src/core/database/schema/todo.schema.ts",
  out: "./drizzle",

  dialect: "postgresql",

  dbCredentials: {
    url: databaseUrl,
  },
} satisfies Config;
