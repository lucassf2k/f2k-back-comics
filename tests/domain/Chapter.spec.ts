import { resolve } from 'node:path'
import { readFileSync } from 'node:fs'
import { Chapter } from '@/domain/Chapter'
import { ApiError } from '@/domain/errors/ApiError'

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
    expect(sut).toHaveProperty('coverURL')
    expect(sut).toHaveProperty('contentURL')
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
    sut.coverURL = 'comics/154651/15461/262.png'
    sut.contentURL = 'comics/154651/15461/262.pdf'
    expect(sut.coverURL).toBe('comics/154651/15461/262.png')
    expect(sut.contentURL).toBe('comics/154651/15461/262.pdf')
  })

  test('should add content upload', async () => {
    const sut = new Chapter('001', 'Noite clara', new Date())
    const filePath = resolve(__dirname, '..', '..', 'comics', '6-2.pdf')
    const file: { originalname: string; buffer: Buffer } = {
      originalname: 'vamoslá.pdf',
      buffer: readFileSync(filePath),
    }
    await sut.addContentURL(file)
    expect(sut.contentURL).toBeTruthy()
  })
})
