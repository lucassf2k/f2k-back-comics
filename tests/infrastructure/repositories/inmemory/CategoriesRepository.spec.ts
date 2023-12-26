import { Genre } from '@/domain/Genre'
import { IGenresRepository } from '@/application/repositories/IGenresRepository'
import { GenresInMemoryRepository } from '@/infrastructure/repositories/inmemory/GenresInMemoryRepository'

let GenresRepository: IGenresRepository

describe('GenresRepository Test', () => {
  beforeEach(() => {
    GenresRepository = new GenresInMemoryRepository()
  })

  test('should be create a Genre', async () => {
    const newGenre = Genre.create('Drama')
    const sut = await GenresRepository.save(newGenre)
    expect(sut).toBe(newGenre)
  })

  test('should be return all Genres', async () => {
    const newGenre = Genre.create('Drama')
    const newGenre2 = Genre.create('Fantasia')
    await GenresRepository.save(newGenre)
    await GenresRepository.save(newGenre2)
    const sut = await GenresRepository.list()
    expect(sut.length).toBe(2)
  })
})
