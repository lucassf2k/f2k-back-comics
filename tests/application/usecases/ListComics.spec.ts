import { resolve } from 'node:path'
import { Name } from '@/domain/Name'
import { readFileSync } from 'node:fs'
import { Genre } from '@/domain/Genre'
import { Author } from '@/domain/Author'
import { ListComics } from '@/application/usecases/ListComics'
import { CreateComic } from '@/application/usecases/CreateComic'
import { IComicsRepository } from '@/application/repositories/IComicsRepository'
import { CreateComicInput } from '@/application/usecases/protocols/ICreateComic'
import { IChaptersRepository } from '@/application/repositories/IChaptersRepository'
import { ComicsInMemoryRepository } from '@/infrastructure/repositories/inmemory/ComicsInMemoryRepository'
import { ChaptersInMemoryRepository } from '@/infrastructure/repositories/inmemory/ChaptersInMemoryRepository'

let comicsRepository: IComicsRepository
let chaptersRepository: IChaptersRepository
let chapterPath: string
let comicCoverPath: string
let fileChapter: { originalname: string; buffer: Buffer }
let comicCover: { originalname: string; buffer: Buffer }

describe('ListComics Test', () => {
  beforeEach(() => {
    comicsRepository = new ComicsInMemoryRepository()
    chaptersRepository = new ChaptersInMemoryRepository()
    chapterPath = resolve(__dirname, '..', '..', '..', 'comics', 'manga.pdf')
    comicCoverPath = resolve(
      __dirname,
      '..',
      '..',
      '..',
      'comics',
      'cover.jpeg',
    )
    fileChapter = {
      originalname: 'manga.pdf',
      buffer: readFileSync(chapterPath),
    }
    comicCover = {
      originalname: 'cover.jpeg',
      buffer: readFileSync(comicCoverPath),
    }
  })

  test('should list all comics', async () => {
    const createComic = new CreateComic(comicsRepository, chaptersRepository)
    const newAuthor = new Author({
      name: new Name('Author Test'),
      about: 'Nascido em...',
      dateOfBirth: new Date(),
    })
    const newChapter1 = {
      number: '001',
      title: 'A ninja',
      file: {
        originalname: fileChapter.originalname,
        buffer: fileChapter.buffer,
      },
    }
    const newChapter2 = {
      number: '002',
      title: 'Dois Vortex',
      file: {
        originalname: fileChapter.originalname,
        buffer: fileChapter.buffer,
      },
    }
    const input: CreateComicInput = {
      name: 'Name Comic',
      synopsis: 'O mundo ninja passa por momentos muito...',
      author: newAuthor,
      genres: [Genre.create('Ação'), Genre.create('Fantasia')],
      chapters: [newChapter1, newChapter2],
      fileCover: {
        originalname: comicCover.originalname,
        buffer: comicCover.buffer,
      },
    }
    await createComic.execute(input)
    const sut = new ListComics(comicsRepository)
    const output = await sut.execute()
    output.forEach((comic) => {
      expect(comic.id).toBeTruthy()
      expect(comic.path).toBeTruthy()
      expect(comic.genres.length).toBe(2)
      expect(comic.coverPath).toBeTruthy()
      expect(comic.chapters.length).toBe(2)
      expect(comic.name).toStrictEqual('Name Comic')
    })
  })
})
