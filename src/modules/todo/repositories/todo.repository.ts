import { and, asc, count, desc, eq } from "drizzle-orm";
import { db } from "../../../core/database/db.js";
import { todos } from "../../../core/database/schema/todo.schema.js";
import type { TodoEntity } from "../entities/todo.entities.js";
import type { CreateTodoDto, TodoQueryDto, UpdateTodoDto } from "../validations/todo.validation.js";
import { BaseRepository } from "./base.repository.js";
import type { ITodoRepository } from "./todo.repository.interface.js";
export class TodoRepository extends BaseRepository<TEntity, TCreate, TUpdate> implements ITodoRepository{
  
  async create(payload: CreateTodoDto): Promise<TodoEntity> {
    const [todo] = await db
      .insert(todos)
      .values(payload)
      .returning();

      if(!todo) throw new Error ("failed to create todo")
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

  async findById(id: string): Promise<TodoEntity | undefined>{
    const [todo] = await db
    .select()
    .from(todos)
    .where(eq(todos.id, id))
    .limit(1)

    return todo
  }
  async update(id: string, payload: UpdateTodoDto): Promise<TodoEntity>{
    const [todo] = await db
    .update(todos)
    .set({...payload, updatedAt: new Date()})
    .where(eq(todos.id, id))
    .returning()

    if(!todo) throw new Error("failed to update")
    return todo
  }
  async delete(id: string):Promise<void>{
    const [todo] = await db
    .delete(todos)
    .where(eq(todos.id, id))
    .returning()

    if(!todo) throw new Error("failed to delete todo")
    
  }
}
