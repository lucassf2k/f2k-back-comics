import express from 'express'
import { routes } from '@/infrastructure/express/routes'
import { AppEnvs } from '../configurations/environments/AppEnvs'

export function expressApplication(): void {
  const app = express()
  app.use(express.json())
  app.use(routes)
  app.listen(AppEnvs.APP_PORT, () =>
    console.log(`Server started at PORT ${AppEnvs.APP_PORT}`),
  )
}
