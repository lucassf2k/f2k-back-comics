import { Author } from '@/domain/Author'
import { IAuthorsRepository } from '@/application/repositories/IAuthorsRepository'
import { AuthorsInMemoryRepository } from '@/infrastructure/repositories/inmemory/AuthorsInMemoryRepository'
import { Name } from '@/domain/Name'

let authorsRepository: IAuthorsRepository

describe('AuthorInMemoryRepository Test', () => {
  beforeEach(() => {
    authorsRepository = new AuthorsInMemoryRepository()
  })

  test('should be save a author', async () => {
    const author = new Author(
      new Name('Fulano test'),
      'Lorem Ipsum',
      new Date(),
    )
    const output = await authorsRepository.save(author)
    expect(output.id).toBeTruthy()
  })

  test('should be list authors', async () => {
    const author = new Author(
      new Name('Fulano test'),
      'Lorem Ipsum',
      new Date(),
    )
    await authorsRepository.save(author)
    const output = await authorsRepository.list()
    expect(output.length).toBe(1)
  })

  test('should be update author', async () => {
    const author = new Author(
      new Name('Fulano test'),
      'Lorem Ipsum',
      new Date(),
    )
    await authorsRepository.save(author)
    author.name = new Name('Beltrano Potter')
    author.about = 'asdadaddads'
    author.dateOfBirth = new Date('12/02/1985')
    author.works = []
    await authorsRepository.update(author)
    const output = await authorsRepository.getById(author.id)
    expect(output.name.value).not.toBe(new Name('Fulano test').value)
    expect(output.about).not.toBe('Lorem Ipsum')
    expect(output.dateOfBirth.getTime()).toBe(new Date('12/02/1985').getTime())
  })

  test('should be get author by id', async () => {
    const author1 = new Author(
      new Name('Fulano test'),
      'Lorem Ipsum',
      new Date(),
    )
    const author2 = new Author(
      new Name('Ciclano test'),
      'Lorem Ipsum',
      new Date(),
    )
    const savedAuthor = await authorsRepository.save(author1)
    await authorsRepository.save(author2)
    const output = await authorsRepository.getById(savedAuthor.id)
    expect(output.name.value).toBe(author1.name.value)
  })

  test('should be get author by name', async () => {
    const author1 = new Author(
      new Name('Fulano test'),
      'Lorem Ipsum',
      new Date(),
    )
    const author2 = new Author(
      new Name('Ciclano test'),
      'Lorem Ipsum',
      new Date(),
    )
    await authorsRepository.save(author1)
    const savedAuthor = await authorsRepository.save(author2)
    const output = await authorsRepository.getByName(savedAuthor.name)
    expect(output.name.value).toBe(author2.name.value)
  })

  test('should be delete author', async () => {
    const author1 = new Author(
      new Name('Fulano test'),
      'Lorem Ipsum',
      new Date(),
    )
    const author2 = new Author(
      new Name('Ciclano test'),
      'Lorem Ipsum',
      new Date(),
    )
    await authorsRepository.save(author1)
    const savedAuthor = await authorsRepository.save(author2)
    await authorsRepository.delete(savedAuthor.id)
    expect((await authorsRepository.list()).length).toBe(1)
  })
})
