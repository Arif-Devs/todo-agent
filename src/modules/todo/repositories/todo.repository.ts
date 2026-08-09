import { db } from "../../../core/database/db.js";
import { todos } from "../../../core/database/schema/todo.schema.js";

import type { CreateTodoDto } from "../validations/todo.validation.js";

export class TodoRepository {
  async create(data: CreateTodoDto) {
    const [todo] = await db
      .insert(todos)
      .values({
        title: data.title,
        description: data.description,
      })
      .returning();
    return todo;
  }

  async findAll() {
    return db.select().from(todos);
  }
}
