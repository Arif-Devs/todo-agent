import app from "./app.js";
import { env } from "./core/config/env.js";
import { pool } from "./core/database/db.js";

const server = app.listen(env.PORT, () =>{
  console.log(`server running on port : ${env.PORT}`);
})

const shutDown = async(signal: string)=>{
  console.log(`${signal} received, shutting down server...`);

  server.close(async ()=>{
    try {
      await pool.end()

      console.log("database connection pool closed");
      process.exit(0)
      
    } catch (error) {
      console.error("failed to close database connection pool:", error)
      process.exit(1)
    }
  })
  
}

process.on("SIGINT", ()=> shutDown("SIGINT"))
process.on("SIGTERM", ()=> shutDown("SIGTERM"))