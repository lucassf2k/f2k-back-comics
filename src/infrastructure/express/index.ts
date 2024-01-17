import express from 'express'
import { routes } from '@/infrastructure/express/routes'
import { ENV } from '@/infrastructure/configurations/environments'
import { errorHandler } from '@/infrastructure/express/middlewares/errorHandler'
import { staticFilesConfigurations } from '@/infrastructure/express/middlewares/staticFilesConfigurations'

export function expressApplication(): void {
  const app = express()
  app.use(express.json())
  app.use(routes)
  staticFilesConfigurations(app)
  app.use(errorHandler)
  app.listen(ENV.APP_PORT, () =>
    console.log(`HTTP server running at localhost:${ENV.APP_PORT}`),
  )
}
