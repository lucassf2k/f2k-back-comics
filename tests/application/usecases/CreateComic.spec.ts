import { CreateComic } from '@/application/usecases/CreateComic'
import { IComicsRepository } from '../repositories/IComicsRepository'
import { IChaptersRepository } from '../repositories/IChaptersRepository'
import { ComicsInMemoryRepository } from '@/infrastructure/repositories/inmemory/ComicsInMemoryRepository'
import { ChaptersInMemoryRepository } from '@/infrastructure/repositories/inmemory/ChaptersInMemoryRepository'
import { CreateComicInput } from './protocols/ICreateComic'
import { Author } from '@/domain/Author'
import { Name } from '@/domain/Name'
import { Genre } from '@/domain/Genre'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import { InvalidParameterError } from '@/domain/errors/InvalidParameterError'

let comicsRepository: IComicsRepository
let chaptersRepository: IChaptersRepository

describe('CreateComic Test', () => {
  beforeEach(() => {
    comicsRepository = new ComicsInMemoryRepository()
    chaptersRepository = new ChaptersInMemoryRepository()
  })

  test('should create a comic', async () => {
    const sut = new CreateComic(comicsRepository, chaptersRepository)
    const newAuthor = new Author({
      name: new Name('Masashi Kishimoto'),
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
    const chapterCoverPath = resolve(
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
    const chapterCover: { originalname: string; buffer: Buffer } = {
      originalname: 'image.jpg',
      buffer: readFileSync(chapterCoverPath),
    }
    const newChapter = {
      number: '001',
      title: 'A ninja',
      file: {
        originalname: fileChapter.originalname,
        buffer: fileChapter.buffer,
      },
      fileCover: {
        originalname: chapterCover.originalname,
        buffer: chapterCover.buffer,
      },
    }
    const input: CreateComicInput = {
      name: 'Boruto',
      synopsis: 'O mundo ninja passa por momentos muito...',
      authors: [newAuthor],
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
      name: 'Boruto',
      synopsis: 'O mundo ninja passa por momentos muito...',
      authors: [newAuthor],
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
    const comicCoverPath = resolve(
      __dirname,
      '..',
      '..',
      '..',
      'comics',
      'image.jpg',
    )
    const comicCover: { originalname: string; buffer: Buffer } = {
      originalname: 'image.jpg',
      buffer: readFileSync(comicCoverPath),
    }
    const input: CreateComicInput = {
      name: 'Name Comic',
      synopsis: 'O mundo ninja passa por momentos muito...',
      authors: [newAuthor],
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
      authors: [newAuthor],
      genres: [Genre.create('Ação'), Genre.create('Fantasia')],
    }
    const output = await sut.execute(input)
    expect(output.location).toBeTruthy()
    expect(output).toHaveProperty('location')
  })
})
