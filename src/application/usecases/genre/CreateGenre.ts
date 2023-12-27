import { Genre } from '@/domain/genre/Genre'
import {
  CreateGenreInput,
  CreateGenreOutPut,
  ICreateGenre,
} from '@/application/usecases/protocols/genre/ICreateGenre'
import { IGenresRepository } from '@/domain/genre/IGenresRepository'
import { AppEnvs } from '@/infrastructure/configurations/environments/AppEnvs'

export class CreateGenre implements ICreateGenre {
  constructor(private readonly GenresRepository: IGenresRepository) {}

  async execute(input: CreateGenreInput): Promise<CreateGenreOutPut> {
    const newGenre = Genre.create(input.name)
    const response = await this.GenresRepository.save(newGenre)
    const url = `${AppEnvs.APP_DNS}/Genres/${response.id}`
    return { url } as CreateGenreOutPut
  }
}
