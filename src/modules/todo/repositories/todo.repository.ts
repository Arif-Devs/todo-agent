import { db } from "../../../core/database/db.js";
import type { CreateTodoDto,UpdateTodoDto, TodoQueryDto } from "../validations/todo.validation.js";
import { todos } from "../../../core/database/schema/todo.schema.js";
import {count, desc, eq, and, asc} from "drizzle-orm"

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

  async findAll(query: TodoQueryDto) {

    const {page, limit, completed, sortBy, sortOrder} = query
    const offset = (page - 1) * limit
    const condition = []
    
    if(completed !== undefined){
      condition.push(eq(todos.completed, completed))
    }
    
    const whereCondition = condition.length>0?and(...condition): undefined


    const sortColumn = {
    createdAt: todos.createdAt,
    updatedAt: todos.updatedAt,
    title: todos.title,
    }[sortBy];

    const orderBy = sortOrder === "asc"? asc(sortColumn): desc(sortColumn);

    const data = await db
    .select()
    .from(todos)
    .where(whereCondition)
    .orderBy(orderBy)
    .limit(limit)
    .offset(offset)

    const countResult = await db
    .select({
      total: count()
    })
    .from(todos)
    .where(whereCondition)

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
