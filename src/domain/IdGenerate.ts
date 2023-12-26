import { randomUUID } from 'node:crypto'
import { ulid } from 'ulid'

function uuid(): string {
  return randomUUID()
}
export const IdGenerate = Object.freeze({
  uuid,
  ulid,
})
