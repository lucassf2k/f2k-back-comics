/* eslint-disable camelcase */
import { extname, join } from 'node:path'
import { createWriteStream, mkdirSync, rmSync } from 'node:fs'
import { IdGenerateService } from '@/infrastructure/services/IdGenerateService'

export type UploadingServiceInput = {
  originalname: string
  buffer: Buffer
}

const BASE_PATH = 'comics'

export class UploadingService {
  static createFile(filePath: string, buffer: Buffer): string {
    const fileStream = createWriteStream(filePath)
    fileStream.write(buffer)
    fileStream.end()
    return filePath
  }

  static createFilename(filename: string): string {
    const fileExtension = extname(filename)
    return `${IdGenerateService.ULID()}${fileExtension}`
  }

  static createDirectory(): string {
    const directoryName = `${IdGenerateService.ULID()}`
    return mkdirSync(
      join(__dirname, '..', '..', '..', `${BASE_PATH}`, `${directoryName}`),
      { recursive: true },
    )
  }

  static joinPaths(path1: string, path2: string): string {
    return join(path1, path2)
  }

  static removeDirectory(path: string): void {
    rmSync(path, { recursive: true })
  }
}
