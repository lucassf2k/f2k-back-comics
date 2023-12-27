import { ulid } from 'ulid'
import { randomUUID } from 'node:crypto'

export class IdGenerateService {
  static UIID(): string {
    return randomUUID()
  }

  static ULID(): string {
    return ulid()
  }
}
