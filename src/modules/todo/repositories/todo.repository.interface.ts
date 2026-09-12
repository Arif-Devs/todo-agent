 import type { CreateTodoDto, TodoQueryDto, UpdateTodoDto } from "../validations/todo.validation.js";

import type { IBaseRepository } from "./base.repository.interface.js";

import {TodoEntity} from "../entities/todo.entities.js"

export interface ITodoRepository extends IBaseRepository<TodoEntity, CreateTodoDto, UpdateTodoDto>{
    
    create(payload: CreateTodoDto): Promise<TodoEntity>

    findAll(query: TodoQueryDto): Promise<{data: TodoEntity[]; total: number}>

    findById(id: string): Promise<TodoEntity | undefined>

    update(id: string, payload: UpdateTodoDto): Promise<TodoEntity>

    delete(id: string): Promise<void>


}

