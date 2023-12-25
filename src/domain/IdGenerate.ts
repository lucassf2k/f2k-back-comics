import { randomUUID } from 'node:crypto'

function uuid(): string {
  return randomUUID()
}
export const IdGenerate = Object.freeze({
  uuid,
})
