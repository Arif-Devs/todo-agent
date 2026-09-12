import type { IBaseRepository } from "./base.repository.interface.js";

export abstract class BaseRepository<TEntity, TCreate, TUpdate> implements IBaseRepository<TEntity, TCreate, TUpdate>{

    abstract create(payload: TCreate): Promise<TEntity>;

    abstract findById(id: string): Promise<TEntity | undefined>;

    abstract update(id: string, payload: TUpdate): Promise<TEntity>;

    abstract delete(id: string): Promise<void>;

}