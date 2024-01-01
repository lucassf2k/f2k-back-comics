import { Name } from '@/domain/Name'
import { Comic, ComicProps } from '@/domain/Comic'
import { Genre } from '@/domain/Genre'
import { Chapter } from '@/domain/Chapter'
import { UploadingService } from '@/infrastructure/services/UploadingService'
import { InvalidParameterError } from '@/domain/errors/InvalidParameterError'

let comicProps: ComicProps

describe('Comic Test', () => {
  beforeEach(() => {
    comicProps = {
      name: 'Fullmetal Alchemist',
      synopsis:
        'Os irmãos Edward e Al Elric praticam o tabu da transmutação humana e pagam caro por isso. Edward perde um braço e uma perna e Al perde o corpo todo. Os dois crescem e decidem sair pelo mundo em busca de uma maneira de consertar o que fizeram.',
      releaseDate: new Date(),
      authorName: new Name('Himura Naoki'),
    }
  })

  test('should be create a comic', () => {
    const sut = new Comic(comicProps)
    expect(sut.id).toBeTruthy()
    expect(sut).toHaveProperty('name')
    expect(sut).toHaveProperty('synopsis')
    expect(sut).toHaveProperty('releaseDate')
    expect(sut).toHaveProperty('authorName')
    expect(sut).toHaveProperty('chapters')
    expect(sut).toHaveProperty('genres')
  })

  test('should be add a chapter', () => {
    const sut = new Comic(comicProps)
    const chapter = new Chapter({
      number: '001',
      title: 'Marca do Trovão',
      releaseDate: new Date(),
    })
    sut.addChapter(chapter)
    expect(sut.chapters.length).toBe(1)
  })

  test('should be add path name', () => {
    const sut = new Comic(comicProps)
    const chapter = new Chapter({
      number: '011',
      title: 'Marca do Trovão',
      releaseDate: new Date(),
    })
    sut.addChapter(chapter)
    const direcotory = UploadingService.createDirectory()
    sut.addComicPath(direcotory)
    expect(sut.path).toBeTruthy()
    UploadingService.removeDirectory(direcotory)
  })

  test('should be not add path name empty', () => {
    const sut = new Comic(comicProps)
    const chapter = new Chapter({
      number: '022',
      title: 'Marca do Trovão',
      releaseDate: new Date(),
    })
    sut.addChapter(chapter)
    expect(() => sut.addComicPath('')).toThrow(
      new InvalidParameterError('folder name field is mandatory'),
    )
  })

  test('should list all chapter paths in ascending order', () => {
    const sut = new Comic(comicProps)
    const direcotory = UploadingService.createDirectory()
    sut.addComicPath(direcotory)
    const chapter1 = new Chapter({
      number: '001',
      title: 'Marca do Trovâo',
      releaseDate: new Date(),
    })
    chapter1.addChapterPath('cap01.pdf')
    const chapter2 = new Chapter({
      number: '002',
      title: 'Marca do Trovâo',
      releaseDate: new Date(),
    })
    chapter2.addChapterPath('cap02.pdf')
    sut.addChapter(chapter1)
    sut.addChapter(chapter2)
    const paths = sut.sortChapterNumbersAscendingOrder()
    expect(paths.length).toBe(2)
    expect(paths[0].path).toBeTruthy()
    expect(paths[1].path).toBeTruthy()
    UploadingService.removeDirectory(direcotory)
  })

  test('should not list all chapter paths in ascending order if comic diretoctry not created', () => {
    const sut = new Comic(comicProps)
    const chapter1 = new Chapter({
      number: '001',
      title: 'Marca do Trovâo',
      releaseDate: new Date(),
    })
    chapter1.addChapterPath('cap01.pdf')
    const chapter2 = new Chapter({
      number: '003',
      title: 'Marca do Trovâo',
      releaseDate: new Date(),
    })
    chapter2.addChapterPath('cap02.pdf')
    sut.addChapter(chapter1)
    sut.addChapter(chapter2)
    expect(() => sut.sortChapterNumbersAscendingOrder()).toThrow(
      new InvalidParameterError('comic directories were not created'),
    )
  })

  test('should add cover name', async () => {
    const sut = new Comic(comicProps)
    sut.addComicCoverPath('a estrela do oeste.pdf')
    expect(sut.coverPath).toBeTruthy()
  })

  test('should not add cover with invalid name', async () => {
    const sut = new Comic(comicProps)
    expect(() => sut.addComicCoverPath('')).toThrow(
      new InvalidParameterError('Cover name field is required'),
    )
  })

  test('should add genre in comic', async () => {
    const sut = new Comic(comicProps)
    sut.addGenre(Genre.create('Ação'))
    expect(sut.genres.length).toBe(1)
  })

  test('should list all genres', async () => {
    const sut = new Comic(comicProps)
    sut.addGenre(Genre.create('Ação'))
    sut.addGenre(Genre.create('Fantasia'))
    const allGenres = sut.listGenres()
    expect(allGenres.length).toBe(2)
  })

  test('should update name, synopsis and authorName', async () => {
    const sut = new Comic(comicProps)
    sut.updateName('A Estrela que não brilha')
    sut.updateSynopsis('Uma garota que vive..')
    sut.updateAuthorName(new Name('Lucas Fernandes'))
    expect(sut.name).toStrictEqual('A Estrela que não brilha')
    expect(sut.synopsis).toStrictEqual('Uma garota que vive..')
    expect(sut.authorName.value).toStrictEqual('Lucas Fernandes')
  })
})
