import { resolve } from 'node:path'
import { readFileSync } from 'node:fs'
import { Chapter, ChapterProps } from '@/domain/Chapter'
import { UploadingService } from '@/infrastructure/services/UploadingService'
import { InvalidParameterError } from '@/domain/errors/InvalidParameterError'

let chapterProps: ChapterProps

describe('Chapter Test', () => {
  beforeEach(() => {
    chapterProps = {
      number: '001',
      title: 'Floresta no cêu',
      releaseDate: new Date(),
    }
  })

  test('should be create a chapter', () => {
    const sut = new Chapter({
      number: '011',
      title: 'A volta',
      releaseDate: new Date(),
      coverPath: 'asdasdd.jpg',
      path: 'sdasdasd.pdf',
    })
    expect(sut).toHaveProperty('_id')
    expect(sut).toHaveProperty('number')
    expect(sut).toHaveProperty('title')
    expect(sut).toHaveProperty('releaseDate')
    expect(sut).toHaveProperty('coverPath')
    expect(sut).toHaveProperty('path')
  })

  test('should be create a chapter without cover and content urls', () => {
    const sut = new Chapter(chapterProps)
    expect(sut).toHaveProperty('_id')
    expect(sut).toHaveProperty('number')
    expect(sut).toHaveProperty('title')
    expect(sut).toHaveProperty('releaseDate')
  })

  test('should add cover and content urls', () => {
    const sut = new Chapter(chapterProps)
    sut.addChapterCoverPath('sdadad.jpg')
    sut.addChapterPath('sdadad.pdf')
    expect(sut.coverPath).toBe('sdadad.jpg')
    expect(sut.path).toBe('sdadad.pdf')
  })

  test('should add file path', async () => {
    const sut = new Chapter(chapterProps)
    const filePath = resolve(__dirname, '..', '..', 'comics', '6-2.pdf')
    const file: { originalname: string; buffer: Buffer } = {
      originalname: 'vamoslá.pdf',
      buffer: readFileSync(filePath),
    }
    sut.addChapterPath(UploadingService.createFilename(file.originalname))
    expect(sut.path).toBeTruthy()
  })

  test('should not add file path', async () => {
    const sut = new Chapter(chapterProps)
    const filePath = resolve(__dirname, '..', '..', 'comics', '6-2.pdf')
    const file: { originalname: string; buffer: Buffer } = {
      originalname: 'vamoslá',
      buffer: readFileSync(filePath),
    }
    expect(() =>
      sut.addChapterPath(UploadingService.createFilename(file.originalname)),
    ).toThrow(new InvalidParameterError('Invalid file name'))
  })

  test('should add cover name', async () => {
    const sut = new Chapter(chapterProps)
    const filePath = resolve(__dirname, '..', '..', 'comics', 'touka.jpg')
    const file: { originalname: string; buffer: Buffer } = {
      originalname: 'touka.jpg',
      buffer: readFileSync(filePath),
    }
    sut.addChapterCoverPath(UploadingService.createFilename(file.originalname))
    expect(sut.coverPath).toBeTruthy()
  })

  test('should not add cover path', async () => {
    const sut = new Chapter(chapterProps)
    const filePath = resolve(__dirname, '..', '..', 'comics', 'touka.jpg')
    const file: { originalname: string; buffer: Buffer } = {
      originalname: 'touka',
      buffer: readFileSync(filePath),
    }
    expect(() =>
      sut.addChapterCoverPath(
        UploadingService.createFilename(file.originalname),
      ),
    ).toThrow(new InvalidParameterError('Invalid cover name'))
  })
})
