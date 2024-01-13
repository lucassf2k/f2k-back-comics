import { resolve } from 'node:path'
import { readFileSync } from 'node:fs'
import { Chapter, ChapterProps } from '@/domain/Chapter'
import { UploadingService } from '@/infrastructure/services/UploadingService'
import { InvalidParameterError } from '@/domain/errors/InvalidParameterError'

let chapterProps: ChapterProps
let filePath: string
let file: { originalname: string; buffer: Buffer }

describe('Chapter Test', () => {
  beforeEach(() => {
    chapterProps = {
      number: '001',
      title: 'Floresta no cêu',
      releaseDate: new Date(),
    }
    filePath = resolve(__dirname, '..', '..', 'comics', 'manga.pdf')
    file = {
      originalname: 'manga.pdf',
      buffer: readFileSync(filePath),
    }
  })

  test('should be create a chapter', () => {
    const sut = Chapter.create({
      number: '011',
      title: 'A volta',
      releaseDate: new Date(),
      path: 'sdasdasd.pdf',
    })
    expect(sut).toHaveProperty('_id')
    expect(sut).toHaveProperty('number')
    expect(sut).toHaveProperty('title')
    expect(sut).toHaveProperty('releaseDate')
    expect(sut).toHaveProperty('path')
  })

  test('should be create a chapter without cover and content urls', () => {
    const sut = Chapter.create(chapterProps)
    expect(sut).toHaveProperty('_id')
    expect(sut).toHaveProperty('number')
    expect(sut).toHaveProperty('title')
    expect(sut).toHaveProperty('releaseDate')
  })

  test('should add cover and content urls', () => {
    const sut = Chapter.create(chapterProps)
    sut.addChapterPath('sdadad.pdf')
    expect(sut.path).toBe('sdadad.pdf')
  })

  test('should add file path', () => {
    const sut = Chapter.create(chapterProps)
    sut.addChapterPath(UploadingService.createFilename(file.originalname))
    expect(sut.path).toBeTruthy()
  })

  test('should not add file path if name empty', () => {
    const sut = Chapter.create(chapterProps)

    expect(() => sut.addChapterPath('')).toThrow(
      new InvalidParameterError('Name not be empty'),
    )
  })
})
