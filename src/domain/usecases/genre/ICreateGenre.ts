export type CreateGenreInput = {
  name: string
}

export type CreateGenreOutPut = {
  url: string
}

export interface ICreateGenre {
  execute(input: CreateGenreInput): Promise<CreateGenreOutPut>
}
