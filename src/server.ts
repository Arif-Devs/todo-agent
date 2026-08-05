import { sql } from "drizzle-orm";
import { db } from "./core/database/index.js";

async function bootstrap() {
  try {
    const result = await db.execute(sql`SELECT NOW()`);
    console.log("DATABASE CONNECTED ON PORT !");
    //console.log(result);
  } catch (error) {
    console.error(error);
  }
}
bootstrap();
