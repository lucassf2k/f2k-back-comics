import { Router } from 'express'
import { genreRoutes } from '@/infrastructure/express/routes/genreRoutes'
import { comicsRouters } from '@/infrastructure/express/routes/comicsRoutes'

const routes = Router()
routes.use('/api', genreRoutes)
routes.use('/api', comicsRouters)
export { routes }
