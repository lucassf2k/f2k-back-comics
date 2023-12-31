/* eslint-disable camelcase */
import { extname, join } from 'node:path'
import { createWriteStream, mkdirSync, rmdirSync, rmSync } from 'node:fs'
import { IdGenerateService } from '@/infrastructure/services/IdGenerateService'

export type UploadingServiceInput = {
  originalname: string
  buffer: Buffer
}

const BASE_PATH = 'comics'

export class UploadingService {
  constructor(private file: UploadingServiceInput) {}

  createFile(filePath: string): string {
    const fileStream = createWriteStream(filePath)
    fileStream.write(this.file.buffer)
    fileStream.end()
    return filePath
  }

  createFilename(): string {
    const fileExtension = extname(this.file.originalname)
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

  static removeEmptyDirectory(path: string): void {
    rmdirSync(path, { recursive: true })
  }

  static removeDirectoryWithContent(path: string): void {
    rmSync(path, { recursive: true })
  }
}
