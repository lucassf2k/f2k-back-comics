import express from 'express'
import { routes } from '@/infrastructure/express/routes'
import { AppEnvs } from '@/infrastructure/configurations/environments/AppEnvs'
import { errorHandler } from '@/infrastructure/express/middlewares/errorHandler'
import { staticFilesConfigurations } from '@/infrastructure/express/middlewares/staticFilesConfigurations'

export function expressApplication(): void {
  const app = express()
  app.use(express.json())
  app.use(routes)
  staticFilesConfigurations(app)
  app.use(errorHandler)
  app.listen(AppEnvs.APP_PORT, () =>
    console.log(`HTTP server running at localhost:${AppEnvs.APP_PORT}`),
  )
}
