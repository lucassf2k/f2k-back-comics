import { Router, Request, Response } from 'express'
import { ListGenres } from '@/application/usecases/genre/ListGenres'
import { ListGenresController } from '../controllers/genre/ListGenresController'
import { GenresInMemoryRepository } from '@/infrastructure/repositories/inmemory/GenresInMemoryRepository'

const genreRoutes = Router()
genreRoutes.get('/genres', (request: Request, response: Response) => {
  const listGenresController = new ListGenresController(
    new ListGenres(new GenresInMemoryRepository()),
  )
  listGenresController.handle(request, response)
})
export { genreRoutes }
