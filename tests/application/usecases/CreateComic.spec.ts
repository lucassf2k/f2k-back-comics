import { resolve } from 'path'
import { readFileSync } from 'fs'
import { Name } from '@/domain/Name'
import { Genre } from '@/domain/Genre'
import { Author } from '@/domain/Author'
import { CreateComic } from '@/application/usecases/CreateComic'
import { IComicsRepository } from '@/application/repositories/IComicsRepository'
import { CreateComicInput } from '@/application/usecases/protocols/ICreateComic'
import { IChaptersRepository } from '@/application/repositories/IChaptersRepository'
import { ComicsInMemoryRepository } from '@/infrastructure/repositories/inmemory/ComicsInMemoryRepository'
import { ChaptersInMemoryRepository } from '@/infrastructure/repositories/inmemory/ChaptersInMemoryRepository'

let comicsRepository: IComicsRepository
let chaptersRepository: IChaptersRepository
let comicCoverPath: string
let chapterPath: string
let fileChapter: { originalname: string; buffer: Buffer }
let comicCover: { originalname: string; buffer: Buffer }

describe('CreateComic Test', () => {
  beforeEach(() => {
    comicsRepository = new ComicsInMemoryRepository()
    chaptersRepository = new ChaptersInMemoryRepository()
    comicCoverPath = resolve(
      __dirname,
      '..',
      '..',
      '..',
      'comics',
      'cover.jpeg',
    )
    chapterPath = resolve(__dirname, '..', '..', '..', 'comics', 'manga.pdf')
    fileChapter = {
      originalname: 'manga.pdf',
      buffer: readFileSync(chapterPath),
    }
    comicCover = {
      originalname: 'image.jpeg',
      buffer: readFileSync(comicCoverPath),
    }
  })

  test('should create a comic', async () => {
    const sut = new CreateComic(comicsRepository, chaptersRepository)
    const newAuthor = new Author({
      name: new Name('Masashi Kishimoto'),
      about: 'Nascido em...',
      dateOfBirth: new Date(),
    })
    const newChapter = {
      number: '001',
      title: 'A ninja',
      file: {
        originalname: fileChapter.originalname,
        buffer: fileChapter.buffer,
      },
      fileCover: {
        originalname: comicCover.originalname,
        buffer: comicCover.buffer,
      },
    }
    const input: CreateComicInput = {
      name: 'Boruto',
      synopsis: 'O mundo ninja passa por momentos muito...',
      author: newAuthor,
      genres: [Genre.create('Ação'), Genre.create('Fantasia')],
      chapters: [newChapter],
    }
    const output = await sut.execute(input)
    expect(output).toHaveProperty('location')
    expect(output.location).toBeTruthy()
  })

  test('should create a comic with more than one chapter and add comic cover', async () => {
    const sut = new CreateComic(comicsRepository, chaptersRepository)
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
      name: 'Boruto',
      synopsis: 'O mundo ninja passa por momentos muito...',
      author: newAuthor,
      genres: [Genre.create('Ação'), Genre.create('Fantasia')],
      chapters: [newChapter1, newChapter2],
      fileCover: {
        originalname: comicCover.originalname,
        buffer: comicCover.buffer,
      },
    }
    const output = await sut.execute(input)
    expect(output).toHaveProperty('location')
    expect(output.location).toBeTruthy()
  })

  test('should create a comic without chapters', async () => {
    const sut = new CreateComic(comicsRepository, chaptersRepository)
    const newAuthor = new Author({
      name: new Name('Author Test'),
      about: 'Nascido em...',
      dateOfBirth: new Date(),
    })
    const input: CreateComicInput = {
      name: 'Name Comic',
      synopsis: 'O mundo ninja passa por momentos muito...',
      author: newAuthor,
      genres: [Genre.create('Ação'), Genre.create('Fantasia')],
      fileCover: {
        originalname: comicCover.originalname,
        buffer: comicCover.buffer,
      },
    }
    const output = await sut.execute(input)
    expect(output.location).toBeTruthy()
    expect(output).toHaveProperty('location')
  })

  test('should create a comic without fileCover and chapters', async () => {
    const sut = new CreateComic(comicsRepository, chaptersRepository)
    const newAuthor = new Author({
      name: new Name('Author Test'),
      about: 'Nascido em...',
      dateOfBirth: new Date(),
    })
    const input: CreateComicInput = {
      name: 'Name Comic',
      synopsis: 'O mundo ninja passa por momentos muito...',
      author: newAuthor,
      genres: [Genre.create('Ação'), Genre.create('Fantasia')],
    }
    const output = await sut.execute(input)
    expect(output.location).toBeTruthy()
    expect(output).toHaveProperty('location')
  })
})
