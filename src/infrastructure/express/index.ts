import express, { Request, Response, NextFunction } from 'express'
import { routes } from '@/infrastructure/express/routes'
import { AppEnvs } from '@/infrastructure/configurations/environments/AppEnvs'

export function expressApplication(): void {
  const app = express()
  app.use(express.json())
  app.use(routes)
  app.listen(AppEnvs.APP_PORT, () =>
    console.log(`HTTP server running at localhost:${AppEnvs.APP_PORT}`),
  )
}
