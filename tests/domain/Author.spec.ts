import { Name } from '@/domain/Name'
import { Work, WorkProps } from '@/domain/Work'
import { Author, AuthorProps } from '@/domain/Author'
import { InvalidParameterError } from '@/domain/errors/InvalidParameterError'

let workProps: WorkProps

describe('Author Test', () => {
  beforeEach(() => {
    workProps = {
      title: 'Crônicas nas Estrelas',
      releaseDate: new Date(),
      path: 'comic/asd/sad.pdf',
    }
  })

  test('should be create a author with name valid', () => {
    const authorProps: AuthorProps = {
      name: new Name('Test Name'),
      about: 'Lorem Ipsum',
      dateOfBirth: new Date(),
    }
    const sut = new Author(authorProps)
    expect(sut.id).toBeTruthy()
  })

  test('should not create a author with name invalid', () => {
    expect(
      () =>
        new Author({
          name: new Name('Test'),
          about: 'Lorem Ipsum',
          dateOfBirth: new Date(),
        }),
    ).toThrow(
      new InvalidParameterError(
        'The name of an author should follow the pattern of names separated by space.',
      ),
    )
  })

  test('should be add a work', () => {
    const authorProps: AuthorProps = {
      name: new Name('Test Name'),
      about: 'Lorem Ipsum',
      dateOfBirth: new Date(),
    }
    const sut = new Author(authorProps)
    sut.addWork(new Work(workProps))
    expect(sut.works.length).toBe(1)
  })

  test('should be create a author without works', () => {
    const authorProps: AuthorProps = {
      name: new Name('Test Name'),
      about: 'Lorem Ipsum',
      dateOfBirth: new Date(),
    }
    const sut = new Author(authorProps)
    expect(sut.works.length).toBe(0)
  })

  test('should list all works', () => {
    const authorProps: AuthorProps = {
      name: new Name('Test Name'),
      about: 'Lorem Ipsum',
      dateOfBirth: new Date(),
    }
    const sut = new Author(authorProps)
    const work1 = new Work(workProps)
    const work2 = new Work({
      title: 'A Estrela do Norte',
      releaseDate: new Date(),
      path: 'comic/asd/sade.pdf',
    })
    sut.addWork(work1)
    sut.addWork(work2)
    const allWorks = sut.listWorks()
    expect(allWorks.length).toBe(2)
  })
})
