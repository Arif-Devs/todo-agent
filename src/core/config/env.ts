import dotenv from "dotenv";

dotenv.config();

const isTest = process.env.NODE_ENV === "test"

export const env = {
  PORT: Number(process.env.PORT) || 5000,

  DATABASE_URL: isTest
  ? process.env.TEST_DATABASE_URL! 
  : process.env.DATABASE_URL,

  TODO_API_URL: process.env.TODO_API_URL || "http://localhost:5000"
};
