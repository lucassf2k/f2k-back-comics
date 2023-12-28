import { Genre } from '@/domain/Genre'
import {
  CreateGenreInput,
  CreateGenreOutPut,
  ICreateGenre,
} from '@/domain/usecases/ICreateGenre'
import { IGenresRepository } from '@/application/repositories/IGenresRepository'
import { AppEnvs } from '@/infrastructure/configurations/environments/AppEnvs'

export class CreateGenre implements ICreateGenre {
  constructor(private readonly GenresRepository: IGenresRepository) {}

  async execute(input: CreateGenreInput): Promise<CreateGenreOutPut> {
    const newGenre = Genre.create(input.name)
    const response = await this.GenresRepository.save(newGenre)
    const url = `${AppEnvs.APP_DNS}/genres/${response.id}`
    return { url } as CreateGenreOutPut
  }
}
