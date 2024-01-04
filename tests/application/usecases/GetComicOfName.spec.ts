import { Name } from '@/domain/Name'
import { Genre } from '@/domain/Genre'
import { Author } from '@/domain/Author'
import { NotFoundError } from '@/domain/errors/NotFoundError'
import { CreateComic } from '@/application/usecases/CreateComic'
import { GetComicOfName } from '@/application/usecases/GetComicOfName'
import { InvalidParameterError } from '@/domain/errors/InvalidParameterError'
import { CreateComicInput } from '@/application/usecases/protocols/ICreateComic'
import { IComicsRepository } from '@/application/repositories/IComicsRepository'
import { IChaptersRepository } from '@/application/repositories/IChaptersRepository'
import { ComicsInMemoryRepository } from '@/infrastructure/repositories/inmemory/ComicsInMemoryRepository'
import { ChaptersInMemoryRepository } from '@/infrastructure/repositories/inmemory/ChaptersInMemoryRepository'

let comicsRepository: IComicsRepository
let chaptersRepository: IChaptersRepository

describe('GetComicOfName Test', () => {
  beforeEach(() => {
    comicsRepository = new ComicsInMemoryRepository()
    chaptersRepository = new ChaptersInMemoryRepository()
  })
  test('should return a comic', async () => {
    const newAuthor = new Author({
      name: new Name('Masashi Kishimoto'),
      about: 'Nascido em...',
      dateOfBirth: new Date(),
    })
    const input: CreateComicInput = {
      name: 'Boruto',
      synopsis: 'O mundo ninja passa por momentos muito...',
      author: newAuthor,
      genres: [Genre.create('Ação'), Genre.create('Fantasia')],
    }
    const createComic = new CreateComic(comicsRepository, chaptersRepository)
    await createComic.execute(input)
    const sut = new GetComicOfName(comicsRepository)
    const { id, name, cover, releaseDate, synopsis } = await sut.execute({
      name: input.name,
    })
    expect(id).toBeTruthy()
    expect(cover).toBeFalsy()
    expect(releaseDate).toBeTruthy()
    expect(name).toStrictEqual(input.name)
    expect(synopsis).toStrictEqual(input.synopsis)
  })

  test('should return a throw InvalidParameterError when name is empty', async () => {
    const newAuthor = new Author({
      name: new Name('Masashi Kishimoto'),
      about: 'Nascido em...',
      dateOfBirth: new Date(),
    })
    const input: CreateComicInput = {
      name: '',
      synopsis: 'O mundo ninja passa por momentos muito...',
      author: newAuthor,
      genres: [Genre.create('Ação'), Genre.create('Fantasia')],
    }
    const sut = new GetComicOfName(comicsRepository)
    expect(() => sut.execute({ name: input.name })).rejects.toThrow(
      new InvalidParameterError('Field name is required'),
    )
  })

  test('should return a throw NotFound if comic not exists', async () => {
    const newAuthor = new Author({
      name: new Name('Masashi Kishimoto'),
      about: 'Nascido em...',
      dateOfBirth: new Date(),
    })
    const input: CreateComicInput = {
      name: 'Boruto',
      synopsis: 'O mundo ninja passa por momentos muito...',
      author: newAuthor,
      genres: [Genre.create('Ação'), Genre.create('Fantasia')],
    }
    const sut = new GetComicOfName(comicsRepository)
    expect(() => sut.execute({ name: input.name })).rejects.toThrow(
      new NotFoundError(),
    )
  })
})
