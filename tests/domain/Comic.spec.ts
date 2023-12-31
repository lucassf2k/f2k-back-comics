import { Name } from '@/domain/Name'
import { Comic } from '@/domain/Comic'
import { Chapter } from '@/domain/Chapter'
import { UploadingService } from '@/infrastructure/services/UploadingService'
import { InvalidParameterError } from '@/domain/errors/InvalidParameterError'

describe('Comic Test', () => {
  test('should be create a comic', () => {
    const sut = new Comic(
      'Fullmetal Alchemist',
      'Os irmãos Edward e Al Elric praticam o tabu da transmutação humana e pagam caro por isso. Edward perde um braço e uma perna e Al perde o corpo todo. Os dois crescem e decidem sair pelo mundo em busca de uma maneira de consertar o que fizeram.',
      new Date(),
      new Name('Himura Naoki'),
    )
    expect(sut).toHaveProperty('_id')
    expect(sut).toHaveProperty('name')
    expect(sut).toHaveProperty('synopsis')
    expect(sut).toHaveProperty('releaseDate')
    expect(sut).toHaveProperty('authorName')
    expect(sut).toHaveProperty('chapters')
  })

  test('should be add a chapter', () => {
    const sut = new Comic(
      'Fullmetal Alchemist',
      'Os irmãos Edward e Al Elric praticam o tabu da transmutação humana e pagam caro por isso. Edward perde um braço e uma perna e Al perde o corpo todo. Os dois crescem e decidem sair pelo mundo em busca de uma maneira de consertar o que fizeram.',
      new Date(),
      new Name('Himura Naoki'),
    )
    const chapter = new Chapter('001', 'Marca do Trovão', new Date())
    sut.addChapter(chapter)
    expect(sut.chapters.length).toBe(1)
  })

  test('should be add path name', () => {
    const sut = new Comic(
      'Fullmetal Alchemist',
      'Os irmãos Edward e Al Elric praticam o tabu da transmutação humana e pagam caro por isso. Edward perde um braço e uma perna e Al perde o corpo todo. Os dois crescem e decidem sair pelo mundo em busca de uma maneira de consertar o que fizeram.',
      new Date(),
      new Name('Himura Naoki'),
    )
    const chapter = new Chapter('001', 'Marca do Trovão', new Date())
    sut.addChapter(chapter)
    const direcotory = UploadingService.createDirectory()
    sut.addComicPath(direcotory)
    console.log(sut.path)
    expect(sut.path).toBeTruthy()
  })

  test('should be not add path name empty', () => {
    const sut = new Comic(
      'Fullmetal Alchemist',
      'Os irmãos Edward e Al Elric praticam o tabu da transmutação humana e pagam caro por isso. Edward perde um braço e uma perna e Al perde o corpo todo. Os dois crescem e decidem sair pelo mundo em busca de uma maneira de consertar o que fizeram.',
      new Date(),
      new Name('Himura Naoki'),
    )
    const chapter = new Chapter('001', 'Marca do Trovão', new Date())
    sut.addChapter(chapter)
    expect(() => sut.addComicPath('')).toThrow(
      new InvalidParameterError('folder name field is mandatory'),
    )
  })

  test('should list all chapter paths in ascending order', () => {
    const sut = new Comic(
      'Fullmetal Alchemist',
      'Os irmãos Edward e Al Elric praticam o tabu da transmutação humana e pagam caro por isso. Edward perde um braço e uma perna e Al perde o corpo todo. Os dois crescem e decidem sair pelo mundo em busca de uma maneira de consertar o que fizeram.',
      new Date(),
      new Name('Himura Naoki'),
    )
    const direcotory = UploadingService.createDirectory()
    sut.addComicPath(direcotory)
    const chapter1 = new Chapter('001', 'Marca do Trovão', new Date())
    chapter1.addChapterPath('cap01.pdf')
    const chapter2 = new Chapter('002', 'Marca do Trovão', new Date())
    chapter2.addChapterPath('cap02.pdf')
    sut.addChapter(chapter1)
    sut.addChapter(chapter2)
    const paths = sut.sortChapterNumbersAscendingOrder()
    console.log(paths)
    expect(paths.length).toBe(2)
    expect(paths[0].path).toBeTruthy()
    expect(paths[1].path).toBeTruthy()
  })
})
