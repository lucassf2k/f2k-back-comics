import { CreateGenre } from '@/application/usecases/genre/CreateGenre'
import { IGenresRepository } from '@/domain/genre/IGenresRepository'
import { GenresInMemoryRepository } from '@/infrastructure/repositories/inmemory/GenresInMemoryRepository'

let GenresRepository: IGenresRepository

describe('CreateGenre Test', () => {
  beforeEach(() => {
    GenresRepository = new GenresInMemoryRepository()
  })

  test('should be return a url', async () => {
    const sut = new CreateGenre(GenresRepository)
    const GenreName = 'Ação'
    const output = await sut.execute({ name: GenreName })
    expect(output.url).toBeTruthy()
  })
})
