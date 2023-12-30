import { resolve } from 'node:path'
import { readFileSync } from 'node:fs'
import { UploadingFileComicsService } from '@/infrastructure/services/UploadingFileComicsService'

describe('UploadingFileComicsService Test', () => {
  test('should be create a diectory', () => {
    const filePath = resolve(__dirname, '..', '..', '..', 'comics', '6-2.pdf')
    const file: { originalname: string; buffer: Buffer } = {
      originalname: 'vamoslá.pdf',
      buffer: readFileSync(filePath),
    }
    const sut = UploadingFileComicsService.execute(file)
    expect(sut).toBeTruthy()
  })
})
