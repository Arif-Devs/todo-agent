import { Router } from "express";
import { todoController } from "../controllers/index.js";
import { createTodoSchema, todoQuerySchema, updateTodoSchema, todoIdSchema } from "../validations/todo.validation.js";
import { validateRequest } from "../../../middlewares/validate-request.js";
import { AppError } from "../../../core/errors/app-error.js";
import { validateQuery } from "../../../middlewares/validate-query.js";
import { validateParams } from "../../../middlewares/validate-params.js";

const router = Router();

// error test route
router.get("/error", () => {
  throw new AppError("Test error", 400);
});

//Todo routes
router.post("/", validateRequest(createTodoSchema), todoController.create);

router.get("/",validateQuery(todoQuerySchema), todoController.getAll)

router.get("/:id",validateParams(todoIdSchema), todoController.getById)

router.patch("/:id", validateParams(todoIdSchema),validateRequest(updateTodoSchema), todoController.update)

router.delete("/:id",validateParams(todoIdSchema) ,todoController.delete)

export default router;
