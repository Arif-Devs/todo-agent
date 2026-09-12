
import type { IBaseRepository } from "./base.repository.interface.js"

interface User{
    id: string,
    name: string,
    email: string
}

interface CreateUserDto{
    name: string,
    email: string
}

interface UpdateUserDto{
    name?: string,
    email?: string
}

interface IUserRepo extends IBaseRepository<User, CreateUserDto, UpdateUserDto> {
}

class UserRepo implements IUserRepo{
    create(payload: CreateUserDto): Promise<User> {
        throw new Error("Method not implemented.")
    }
    findById(id: string): Promise<User | undefined> {
        throw new Error("Method not implemented.")
    }
    update(id: string, payload: UpdateUserDto): Promise<User> {
        throw new Error("Method not implemented.")
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.")
    }
    
} 

