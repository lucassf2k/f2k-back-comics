import { Name } from '@/domain/Name'
import { Comic } from '@/domain/Comic'
import { Genre } from '@/domain/Genre'
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
    expect(sut.id).toBeTruthy()
    expect(sut).toHaveProperty('name')
    expect(sut).toHaveProperty('synopsis')
    expect(sut).toHaveProperty('releaseDate')
    expect(sut).toHaveProperty('authorName')
    expect(sut).toHaveProperty('chapters')
    expect(sut).toHaveProperty('genres')
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
    expect(sut.path).toBeTruthy()
    UploadingService.removeEmptyDirectory(direcotory)
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
    expect(paths.length).toBe(2)
    expect(paths[0].path).toBeTruthy()
    expect(paths[1].path).toBeTruthy()
    UploadingService.removeEmptyDirectory(direcotory)
  })

  test('should not list all chapter paths in ascending order if comic diretoctry not created', () => {
    const sut = new Comic(
      'Fullmetal Alchemist',
      'Os irmãos Edward e Al Elric praticam o tabu da transmutação humana e pagam caro por isso. Edward perde um braço e uma perna e Al perde o corpo todo. Os dois crescem e decidem sair pelo mundo em busca de uma maneira de consertar o que fizeram.',
      new Date(),
      new Name('Himura Naoki'),
    )
    const chapter1 = new Chapter('001', 'Marca do Trovão', new Date())
    chapter1.addChapterPath('cap01.pdf')
    const chapter2 = new Chapter('002', 'Marca do Trovão', new Date())
    chapter2.addChapterPath('cap02.pdf')
    sut.addChapter(chapter1)
    sut.addChapter(chapter2)
    expect(() => sut.sortChapterNumbersAscendingOrder()).toThrow(
      new InvalidParameterError('comic directories were not created'),
    )
  })

  test('should add cover name', async () => {
    const sut = new Comic(
      'A Estrela do Oeste',
      'Lore Episum',
      new Date(),
      new Name('Lucas Vinicius'),
    )
    sut.addComicCoverPath('a estrela do oeste.pdf')
    expect(sut.coverPath).toBeTruthy()
  })

  test('should not add cover with invalid name', async () => {
    const sut = new Comic(
      'A Estrela do Oeste',
      'Lore Episum',
      new Date(),
      new Name('Lucas Vinicius'),
    )
    expect(() => sut.addComicCoverPath('')).toThrow(
      new InvalidParameterError('Cover name field is required'),
    )
  })

  test('should add genre in comic', async () => {
    const sut = new Comic(
      'A Estrela do Oeste',
      'Lore Episum',
      new Date(),
      new Name('Lucas Vinicius'),
    )
    sut.addGenre(Genre.create('Ação'))
    expect(sut.genres.length).toBe(1)
  })

  test('should list all genres', async () => {
    const sut = new Comic(
      'A Estrela do Oeste',
      'Lore Episum',
      new Date(),
      new Name('Lucas Vinicius'),
    )
    sut.addGenre(Genre.create('Ação'))
    sut.addGenre(Genre.create('Fantasia'))
    const allGenres = sut.listGenres()
    expect(allGenres.length).toBe(2)
  })
})
