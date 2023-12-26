export type ListGenresOutPut = {
  id: string
  name: string
  createdAt: Date
}

export interface IListGenres {
  execute(): Promise<ListGenresOutPut[]>
}
