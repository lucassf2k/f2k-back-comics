import { resolve } from 'node:path'
import { Express, static as staticc } from 'express'

export function staticFilesConfigurations(app: Express): void {
  const staticDir = resolve(__dirname, '..', '..', '..', '..', 'comics')
  app.use(staticc(staticDir))
}
