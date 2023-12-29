import { Express, static as staticc } from 'express'
import { resolve } from 'node:path'

export function staticFilesConfigurations(app: Express): void {
  const staticDir = resolve(__dirname, '..', '..', '..', '..', 'comics')
  app.use(staticc(staticDir))
}
