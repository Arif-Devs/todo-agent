import dotenv from "dotenv";
import { number } from "zod";
dotenv.config();

export const env = {
  PORT: Number(process.env.PORT),

  DATABASE_URL: process.env.DATABASE_URL,
};
