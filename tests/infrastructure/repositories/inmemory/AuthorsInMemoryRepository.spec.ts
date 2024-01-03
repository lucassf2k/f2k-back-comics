import { Name } from '@/domain/Name'
import { Author, AuthorProps } from '@/domain/Author'
import { IAuthorsRepository } from '@/application/repositories/IAuthorsRepository'
import { AuthorsInMemoryRepository } from '@/infrastructure/repositories/inmemory/AuthorsInMemoryRepository'

let authorsRepository: IAuthorsRepository
let authorProps: AuthorProps

describe('AuthorInMemoryRepository Test', () => {
  beforeEach(() => {
    authorsRepository = new AuthorsInMemoryRepository()
    authorProps = {
      name: new Name('Fulano test'),
      about: 'Lorem Ipsum',
      dateOfBirth: new Date(),
    }
  })

  test('should be save a author', async () => {
    const author = new Author(authorProps)
    const output = await authorsRepository.save(author)
    expect(output.id).toBeTruthy()
  })

  test('should be list authors', async () => {
    const author = new Author(authorProps)
    await authorsRepository.save(author)
    const output = await authorsRepository.list()
    expect(output.length).toBe(1)
  })

  test('should be update author', async () => {
    const author = new Author(authorProps)
    await authorsRepository.save(author)
    const updateAuthor = new Author({
      name: new Name('Test Fulano'),
      about: 'asdadada',
      dateOfBirth: new Date('1985-12-02'),
    })
    await authorsRepository.update(updateAuthor, author.id)
    const output = await authorsRepository.getById(author.id)
    expect(output.name.value).not.toBe(new Name('Fulano test').value)
    expect(output.about).not.toBe('Lorem Ipsum')
    expect(output.dateOfBirth.getTime()).toBe(new Date('1985-12-02').getTime())
  })

  test('should be get author by id', async () => {
    const author1 = new Author(authorProps)
    const savedAuthor = await authorsRepository.save(author1)
    const output = await authorsRepository.getById(savedAuthor.id)
    expect(output.name.value).toBe(author1.name.value)
  })

  test('should be get author by name', async () => {
    const author2 = new Author(authorProps)
    const savedAuthor = await authorsRepository.save(author2)
    const output = await authorsRepository.getByName(savedAuthor.name)
    expect(output.name.value).toBe(author2.name.value)
  })

  test('should be delete author', async () => {
    const author2 = new Author(authorProps)
    const savedAuthor = await authorsRepository.save(author2)
    await authorsRepository.delete(savedAuthor.id)
    expect((await authorsRepository.list()).length).toBe(0)
  })
})
