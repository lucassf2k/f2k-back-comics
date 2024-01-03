import { Router } from 'express'
import { genreRoutes } from '@/infrastructure/express/routes/genreRoutes'
import { comicsRoutes } from '@/infrastructure/express/routes/comicsRoutes'

const routes = Router()
routes.use('/api', genreRoutes)
routes.use('/api', comicsRoutes)
export { routes }
