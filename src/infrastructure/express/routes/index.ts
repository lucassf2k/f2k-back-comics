import { Router } from 'express'
import { genreRoutes } from '@/infrastructure/express/routes/genreRoutes'

const routes = Router()
routes.use('/api', genreRoutes)
export { routes }
