import { type Express } from 'express'
import swaggerUI from 'swagger-ui-express'
import { swaggerDocument } from '@/infrastructure/configurations/swaggerDocument'

export function swaggerService(app: Express): void {
  app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))
}
