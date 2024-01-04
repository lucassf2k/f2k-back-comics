export type DeleteComicOfIdInput = {
  id: string
}
export interface IDeleteComicOfId {
  execute(input: DeleteComicOfIdInput): Promise<void>
}
