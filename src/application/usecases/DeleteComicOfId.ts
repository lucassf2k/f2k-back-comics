import { IComicsRepository } from '@/application/repositories/IComicsRepository'
import {
  DeleteComicOfIdInput,
  IDeleteComicOfId,
} from '@/application/usecases/protocols/IDeleteComicOfId'

export class DeleteComicOfId implements IDeleteComicOfId {
  constructor(private readonly comicsRepository: IComicsRepository) {}

  async execute(input: DeleteComicOfIdInput): Promise<void> {
    await this.comicsRepository.delete(input.id)
  }
}
