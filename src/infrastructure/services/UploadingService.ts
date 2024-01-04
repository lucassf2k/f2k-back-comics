/* eslint-disable camelcase */
import { randomBytes } from 'node:crypto'
import { extname, join } from 'node:path'
import { createWriteStream, mkdirSync, rmSync } from 'node:fs'

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
    return `${this.createRandomNames()}${fileExtension}`
  }

  static createDirectory(): string {
    const directoryName = `${this.createRandomNames()}`
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

  static createRandomNames(): string {
    return randomBytes(8).toString('hex')
  }
}
