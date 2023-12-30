/* eslint-disable camelcase */
import { randomInt } from 'node:crypto'
import { extname, resolve, join } from 'node:path'
import { createWriteStream, mkdirSync } from 'node:fs'
import { InvalidParameterError } from '@/domain/errors/InvalidParameterError'
import { IdGenerateService } from '@/infrastructure/services/IdGenerateService'

type File = {
  originalname: string
  buffer: Buffer
}

const MiNIMUM_TO_RAFLE = 0
const MAXIMUM_TO_RAFLE = 9999

export class UploadingFileComicsService {
  static async execute(file: File): Promise<boolean> {
    if (!file) throw new InvalidParameterError('Field file is required')
    const fileExtension = extname(file.originalname)
    const directory = this.createDirectory()
    const filePath = this.createFilename(fileExtension, directory)
    const fileStream = createWriteStream(filePath)
    const haveSucess = fileStream.write(file.buffer)
    fileStream.end()
    return haveSucess
  }

  private static createFilename(
    fileExtension: string,
    directory: string,
  ): string {
    return join(
      directory,
      `${IdGenerateService.ULID()}${this.getRandomInt()}${fileExtension}`,
    )
  }

  private static getRandomInt(): number {
    return randomInt(MiNIMUM_TO_RAFLE, MAXIMUM_TO_RAFLE)
  }

  private static createDirectory(): string {
    const directoryName = `${IdGenerateService.ULID()}${this.getRandomInt()}`
    return mkdirSync(
      resolve(__dirname, '..', '..', '..', 'comics', `${directoryName}`),
      { recursive: true },
    )
  }
}
