import { resolve } from 'node:path'
import { readFileSync } from 'node:fs'
import { Chapter } from '@/domain/Chapter'
import { UploadingService } from '@/infrastructure/services/UploadingService'
import { InvalidParameterError } from '@/domain/errors/InvalidParameterError'

describe('Chapter Test', () => {
  test('should be create a chapter', () => {
    const sut = new Chapter(
      '001',
      'Noite clara',
      new Date(),
      'comics/1545484/1541456.png',
      'comics/1545484/156484.pdf',
    )
    expect(sut).toHaveProperty('_id')
    expect(sut).toHaveProperty('number')
    expect(sut).toHaveProperty('title')
    expect(sut).toHaveProperty('releaseDate')
    expect(sut).toHaveProperty('coverPath')
    expect(sut).toHaveProperty('path')
  })

  test('should be create a chapter without cover and content urls', () => {
    const sut = new Chapter('001', 'Noite clara', new Date())
    expect(sut).toHaveProperty('id')
    expect(sut).toHaveProperty('number')
    expect(sut).toHaveProperty('title')
    expect(sut).toHaveProperty('releaseDate')
  })

  test('should add cover and content urls', () => {
    const sut = new Chapter('001', 'Noite clara', new Date())
    sut.coverPath = '262.png'
    sut.path = '262.pdf'
    expect(sut.coverPath).toBe('262.png')
    expect(sut.path).toBe('262.pdf')
  })

  test('should add file path', async () => {
    const sut = new Chapter('001', 'Noite clara', new Date())
    const filePath = resolve(__dirname, '..', '..', 'comics', '6-2.pdf')
    const file: { originalname: string; buffer: Buffer } = {
      originalname: 'vamoslá.pdf',
      buffer: readFileSync(filePath),
    }
    const uploadingService = new UploadingService(file)
    sut.addChapterPath(uploadingService.createFilename())
    expect(sut.path).toBeTruthy()
  })

  test('should not add file path', async () => {
    const sut = new Chapter('001', 'Noite clara', new Date())
    const filePath = resolve(__dirname, '..', '..', 'comics', '6-2.pdf')
    const file: { originalname: string; buffer: Buffer } = {
      originalname: 'vamoslá',
      buffer: readFileSync(filePath),
    }
    const uploadingService = new UploadingService(file)
    expect(() => sut.addChapterPath(uploadingService.createFilename())).toThrow(
      new InvalidParameterError('Invalid file name'),
    )
  })

  test('should add cover name', async () => {
    const sut = new Chapter('001', 'Noite clara', new Date())
    const filePath = resolve(__dirname, '..', '..', 'comics', 'touka.jpg')
    const file: { originalname: string; buffer: Buffer } = {
      originalname: 'touka.jpg',
      buffer: readFileSync(filePath),
    }
    const uploadingService = new UploadingService(file)
    sut.addChapterCoverPath(uploadingService.createFilename())
    expect(sut.coverPath).toBeTruthy()
  })

  test('should not add cover path', async () => {
    const sut = new Chapter('001', 'Noite clara', new Date())
    const filePath = resolve(__dirname, '..', '..', 'comics', 'touka.jpg')
    const file: { originalname: string; buffer: Buffer } = {
      originalname: 'touka',
      buffer: readFileSync(filePath),
    }
    const uploadingService = new UploadingService(file)
    expect(() =>
      sut.addChapterCoverPath(uploadingService.createFilename()),
    ).toThrow(new InvalidParameterError('Invalid cover name'))
  })
})
