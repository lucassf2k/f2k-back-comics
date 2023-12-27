import { Router, Request, Response } from 'express'
import { ListGenres } from '@/application/usecases/genre/ListGenres'
import { CreateGenre } from '@/application/usecases/genre/CreateGenre'
import { ListGenresController } from '../controllers/genre/ListGenresController'
import { CreateGenreController } from '../controllers/genre/CreateGenreController'
import { GenresInMemoryRepository } from '@/infrastructure/repositories/inmemory/GenresInMemoryRepository'

const genreRoutes = Router()
genreRoutes.post('/genres', (request: Request, response: Response) => {
  const createGenreController = new CreateGenreController(
    new CreateGenre(new GenresInMemoryRepository()),
  )
  createGenreController.handle(request, response)
})
genreRoutes.get('/genres', (request: Request, response: Response) => {
  const listGenresController = new ListGenresController(
    new ListGenres(new GenresInMemoryRepository()),
  )
  listGenresController.handle(request, response)
})
export { genreRoutes }
