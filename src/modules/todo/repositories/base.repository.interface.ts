export interface IBaseRepository<TEntity, TCreate, TUpdate>{
    create(payload: TCreate): Promise<TEntity>

    findById(id: string): Promise<TEntity | undefined>

    update(id: string, payload: TUpdate): Promise<TEntity>

    delete(id: string): Promise<void>
}