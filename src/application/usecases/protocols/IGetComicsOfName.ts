export type GetComicsOfNameInput = {
  name: string
}
export type GetComicsOfNameOutPut = {
  id: string
  name: string
  synopsis: string
  releaseDate: Date
  coverPath: string
}[]
export interface IGetComicsOfName {
  execute(input: GetComicsOfNameInput): Promise<GetComicsOfNameOutPut>
}
