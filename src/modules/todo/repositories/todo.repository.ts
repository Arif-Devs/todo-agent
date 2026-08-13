import { eq } from "drizzle-orm";
import { db } from "../../../core/database/db.js";
import type { CreateTodoDto,UpdateTodoDto } from "../validations/todo.validation.js";
import { todos } from "../../../core/database/schema/todo.schema.js";


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

  async findById(id: string){
    const [todo] = await db
    .select()
    .from(todos)
    .where(eq(todos.id, id))
    .limit(1)

    return todo
  }
  async update(id: string, data: UpdateTodoDto){
    const [todo] = await db
    .update(todos)
    .set({...data, updatedAt: new Date()})
    .where(eq(todos.id, id))
    .returning()

    return todo
  }
  async delete(id: string){
    const [todo] = await db
    .delete(todos)
    .where(eq(todos.id, id))
    .returning()

    return todo
  }

}
