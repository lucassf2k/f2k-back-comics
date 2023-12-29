import { Name } from '@/domain/Name'
import { Work } from '@/domain/Work'
import { Author } from '@/domain/Author'
import { InvalidParameterError } from '@/domain/errors/InvalidParameterError'
import { IdGenerateService } from '@/infrastructure/services/IdGenerateService'

describe('Author Test', () => {
  test('should be create a author with name valid', () => {
    const name = new Name('Lucas Vinicius')
    const works: Work[] = []
    const sut = new Author(name, 'lorem ipsum', new Date('18/11/2001'), works)
    expect(sut).toHaveProperty('id')
    expect(sut).toHaveProperty('about')
    expect(sut).toHaveProperty('dateOfBirth')
    expect(sut).toHaveProperty('works')
  })

  test('should not create a author with name invalid', () => {
    const works: Work[] = []
    expect(
      () =>
        new Author(
          new Name('Lucas'),
          'lorem ipsum',
          new Date('18/11/2001'),
          works,
        ).name,
    ).toThrow(
      new InvalidParameterError(
        'The name of an author should follow the pattern of names separated by space.',
      ),
    )
  })

  test('should be add a workd', () => {
    const name = new Name('Lucas Vinicius')
    const sut = new Author(name, 'lorem ipsum', new Date('18/11/2001'))
    sut.addWork(
      new Work('Crônicas nas Estrelas', new Date(), IdGenerateService.ULID()),
    )
    expect(sut.works.length).toBe(1)
  })

  test('should be create a author without works', () => {
    const name = new Name('Lucas Vinicius')
    const sut = new Author(name, 'lorem ipsum', new Date('18/11/2001'))
    expect(sut.works.length).toBe(0)
  })
})
