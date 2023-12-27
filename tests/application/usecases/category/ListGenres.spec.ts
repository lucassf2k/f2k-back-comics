import { ListGenres } from '@/application/usecases/genre/ListGenres'
import { IGenresRepository } from '@/domain/genre/IGenresRepository'
import { CreateGenre } from '@/application/usecases/genre/CreateGenre'
import { GenresInMemoryRepository } from '@/infrastructure/repositories/inmemory/GenresInMemoryRepository'

let GenresRepository: IGenresRepository

describe('ListGenres Test', () => {
  beforeEach(() => {
    GenresRepository = new GenresInMemoryRepository()
  })

  test('should be return all Genres', async () => {
    const createGenre = new CreateGenre(GenresRepository)
    await createGenre.execute({ name: 'Fantasia' })
    await createGenre.execute({ name: 'Ação' })
    const sut = new ListGenres(GenresRepository)
    const Genres = await sut.execute()
    expect(Genres.length).toBe(2)
  })
})
