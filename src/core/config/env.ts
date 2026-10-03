import dotenv from "dotenv";

dotenv.config();

const isTest = process.env.NODE_ENV === "test"

export const env = {
  PORT: Number(process.env.PORT) || 5000,

  DATABASE_URL: isTest
  ? process.env.TEST_DATABASE_URL! 
  : process.env.DATABASE_URL,

  TODO_API_URL: process.env.TODO_API_URL || "http://localhost:5000",

  OLLAMA_BASE_URL: process.env.OLLAMA_BASE_URL || "http://127.0.0.1:11434",

  OLLAMA_MODEL: process.env.OLLAMA_MODEL || "functiongemma"
};
