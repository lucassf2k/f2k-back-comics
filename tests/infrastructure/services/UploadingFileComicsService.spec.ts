import { readFileSync } from 'fs'
import { UploadingFileComicsService } from '@/infrastructure/services/UploadingFileComicsService'

describe('UploadingFileComicsService Test', () => {
  test('should be create a diectory', () => {
    const filePath = './comics/6-2.pdf'
    const file: { originalname: string; buffer: Buffer } = {
      originalname: 'vamoslá.pdf',
      buffer: readFileSync(filePath),
    }
    const sut = UploadingFileComicsService.execute(file)
    expect(sut).toBeTruthy()
  })
})
