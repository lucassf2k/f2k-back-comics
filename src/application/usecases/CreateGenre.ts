import { Genre } from '@/domain/Genre'
import {
  CreateGenreInput,
  CreateGenreOutPut,
  ICreateGenre,
} from '@/application/usecases/protocols/ICreateGenre'
import { AppEnvs } from '@/infrastructure/configurations/environments/AppEnvs'
import { IGenresRepository } from '@/application/repositories/IGenresRepository'

export class CreateGenre implements ICreateGenre {
  constructor(private readonly GenresRepository: IGenresRepository) {}

  async execute(input: CreateGenreInput): Promise<CreateGenreOutPut> {
    const newGenre = Genre.create(input.name)
    const response = await this.GenresRepository.save(newGenre)
    const url = `genres/${response.id}`
    return { url } as CreateGenreOutPut
  }
}
