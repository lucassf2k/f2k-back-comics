export interface IRepository<ENTITY, ID> {
  save(input: ENTITY): Promise<ENTITY>
  update(input: ENTITY, id: ID): Promise<ENTITY>
  delete(id: ID): Promise<void>
  list(): Promise<ENTITY[]>
}
