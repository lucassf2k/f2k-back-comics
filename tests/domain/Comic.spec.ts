import { Work } from '@/domain/Work'
import { Name } from '@/domain/Name'
import { Comic } from '@/domain/Comic'
import { Author } from '@/domain/Author'
import { Chapter } from '@/domain/Chapter'

describe('Comic Test', () => {
  test('should be create a new Chapter', () => {
    const works: Work[] = []
    const author = new Author(
      new Name('Himoru Arakawa'),
      'lorem ipsum',
      new Date('08/05/1973'),
      works,
    )
    const chapter1 = new Chapter(
      '001',
      'title',
      new Date(),
      'coverURL',
      'comics/1243242.pdf',
    )
    const chapters: Chapter[] = []
    chapters.push(chapter1)
    const sut = Comic.create(
      'Fullmetal Alchemist',
      'Os irmãos Edward e Al Elric praticam o tabu da transmutação humana e pagam caro por isso. Edward perde um braço e uma perna e Al perde o corpo todo. Os dois crescem e decidem sair pelo mundo em busca de uma maneira de consertar o que fizeram.',
      new Date(),
      author.name.value,
      chapters,
    )

    expect(sut).toHaveProperty('id')
    expect(sut).toHaveProperty('name')
    expect(sut).toHaveProperty('synopsis')
    expect(sut).toHaveProperty('releaseDate')
    expect(sut).toHaveProperty('authorName')
    expect(sut).toHaveProperty('chapters')
  })
})
