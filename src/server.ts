import app from "./app.js";
import { env } from "./core/config/env.js";

const startServer = async () => {
  try {
    app.listen(env.PORT, () => {
      console.log(`Server running on port : ${env.PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
