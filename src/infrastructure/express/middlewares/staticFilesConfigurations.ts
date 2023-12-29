import express from 'express'
import { resolve } from 'node:path'

export function staticFilesConfigurations(app: express.Express): void {
  const staticDir = resolve(__dirname, '..', '..', '..', '..', 'comics')
  app.use(express.static(staticDir))
}
