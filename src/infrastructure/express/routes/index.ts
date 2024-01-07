import { Router } from 'express'
import { genreRoutes } from '@/infrastructure/express/routes/genreRoutes'
import { comicsRoutes } from '@/infrastructure/express/routes/comicsRoutes'
import { chapterRoutes } from '@/infrastructure/express/routes/chapterRoutes'

const routes = Router()
routes.use('/api', genreRoutes)
routes.use('/api', comicsRoutes)
routes.use('/api', chapterRoutes)
export { routes }
