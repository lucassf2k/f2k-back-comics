import { Genre } from '@/domain/Genre'
import {
  CreateGenreInput,
  CreateGenreOutPut,
  ICreateGenre,
} from '@/application/usecases/protocols/ICreateGenre'
import { IGenresRepository } from '@/application/repositories/IGenresRepository'
import { ApiError } from '@/domain/errors/ApiError'

export class CreateGenre implements ICreateGenre {
  constructor(private readonly genresRepository: IGenresRepository) {}

  async execute(input: CreateGenreInput): Promise<CreateGenreOutPut> {
    const isGenreAlreadyExists = await this.genresRepository.getOfName(
      input.name,
    )
    if (isGenreAlreadyExists) throw new ApiError('Category name already exists')
    const newGenre = Genre.create(input.name)
    const response = await this.genresRepository.save(newGenre)
    const url = `genres/${response.id}`
    return { url } as CreateGenreOutPut
  }
}
