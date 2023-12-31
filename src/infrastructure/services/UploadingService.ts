/* eslint-disable camelcase */
import { randomInt } from 'node:crypto'
import { extname, resolve, join } from 'node:path'
import { createWriteStream, mkdirSync } from 'node:fs'
import { IdGenerateService } from '@/infrastructure/services/IdGenerateService'

export type UploadingServiceInput = {
  originalname: string
  buffer: Buffer
}

const MiNIMUM_TO_RAFLE = 0
const MAXIMUM_TO_RAFLE = 9999
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
}
