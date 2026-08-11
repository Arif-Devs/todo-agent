import { Router } from "express";
import { todoController } from "../controllers/index.js";
import { createTodoSchema } from "../validations/todo.validation.js";
import { validateRequest } from "../../../middlewares/validate-request.js";
import { AppError } from "../../../core/errors/app-error.js";

const router = Router();

// error test route
router.get("/error", () => {
  throw new AppError("Test error", 400);
});

//Todo routes
router.post("/", validateRequest(createTodoSchema), todoController.create);

router.get("/", todoController.getAll)
router.get("/:id", todoController.getById)

export default router;
