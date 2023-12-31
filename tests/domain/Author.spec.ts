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
    expect(sut.id).toBeTruthy()
  })

  test('should not create a author with name invalid', () => {
    const works: Work[] = []
    expect(
      () =>
        new Author(
          new Name('Lucas'),
          'lorem ipsum',
          new Date('2001-11-18'),
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
    const sut = new Author(name, 'lorem ipsum', new Date('2001-11-18'))
    sut.works.push(
      new Work('Crônicas nas Estrelas', new Date(), IdGenerateService.ULID()),
    )
    expect(sut.works.length).toBe(1)
  })

  test('should be create a author without works', () => {
    const name = new Name('Lucas Vinicius')
    const sut = new Author(name, 'lorem ipsum', new Date('2001-11-18'))
    expect(sut.works.length).toBe(0)
  })

  test('should list all works', () => {
    const sut = new Author(
      new Name('Lucas Vinicius'),
      'lorem ipsum',
      new Date(),
    )
    const work1 = new Work(
      'A Estrela do Oeste',
      new Date('2022-05-22T11:49:43.421Z'),
      'comic/adads/asda.pdf',
    )
    const work2 = new Work(
      'A Garota do C14',
      new Date(),
      'comic/adads/asda.pdf',
    )
    sut.addWork(work1)
    sut.addWork(work2)
    const allWorks = sut.listWorks()
    expect(allWorks.length).toBe(2)
  })
})
