import { db } from "../../../core/database/db.js";
import type { CreateTodoDto,UpdateTodoDto } from "../validations/todo.validation.js";
import { todos } from "../../../core/database/schema/todo.schema.js";
import {count, desc, eq} from "drizzle-orm"

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

  async findAll(page: number, limit: number) {
    const offset = (page - 1) * limit

    const data = await db
    .select()
    .from(todos)
    .orderBy(desc(todos.createdAt))
    .limit(limit)
    .offset(offset)

    const countResult = await db
    .select({
      total: count()
    })
    .from(todos)

    const total = countResult[0]?.total ?? 0

    return{data, total: Number(total)}
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
