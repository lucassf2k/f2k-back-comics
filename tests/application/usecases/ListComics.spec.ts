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

describe('ListComics Test', () => {
  beforeEach(() => {
    comicsRepository = new ComicsInMemoryRepository()
    chaptersRepository = new ChaptersInMemoryRepository()
  })

  test('should list all comics', async () => {
    const createComic = new CreateComic(comicsRepository, chaptersRepository)
    const newAuthor = new Author({
      name: new Name('Author Test'),
      about: 'Nascido em...',
      dateOfBirth: new Date(),
    })
    const chapterFilePath = resolve(
      __dirname,
      '..',
      '..',
      '..',
      'comics',
      'manga.webp',
    )
    const comicCoverPath = resolve(
      __dirname,
      '..',
      '..',
      '..',
      'comics',
      'image.jpg',
    )
    const fileChapter: { originalname: string; buffer: Buffer } = {
      originalname: 'manga.webp',
      buffer: readFileSync(chapterFilePath),
    }
    const comicCover: { originalname: string; buffer: Buffer } = {
      originalname: 'image.jpg',
      buffer: readFileSync(comicCoverPath),
    }
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
      authors: [newAuthor],
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
