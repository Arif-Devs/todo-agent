import { Router } from "express";
import { todoController } from "../controllers/index.js";
import { createTodoSchema, paginationSchema, updateTodoSchema } from "../validations/todo.validation.js";
import { validateRequest } from "../../../middlewares/validate-request.js";
import { AppError } from "../../../core/errors/app-error.js";
import { validateQuery } from "../../../middlewares/validate-query.js";

const router = Router();

// error test route
router.get("/error", () => {
  throw new AppError("Test error", 400);
});

//Todo routes
router.post("/", validateRequest(createTodoSchema), todoController.create);

router.get("/",validateQuery(paginationSchema) ,todoController.getAll)
router.get("/:id", todoController.getById)
router.patch("/:id", validateRequest(updateTodoSchema), todoController.update)
router.delete("/:id", todoController.delete)

export default router;
