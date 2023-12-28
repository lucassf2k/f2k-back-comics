import { Router, Request, Response } from 'express'
import { ListGenres } from '@/application/usecases/genre/ListGenres'
import { CreateGenre } from '@/application/usecases/genre/CreateGenre'
import { ListGenresController } from '@/infrastructure/express/controllers/genre/ListGenresController'
import { CreateGenreController } from '@/infrastructure/express/controllers/genre/CreateGenreController'
import { GenresInMemoryRepository } from '@/infrastructure/repositories/inmemory/GenresInMemoryRepository'

const genreRoutes = Router()
const genresInMemoryRepository = new GenresInMemoryRepository()

genreRoutes.post('/genres', (request: Request, response: Response) => {
  const createGenreController = new CreateGenreController(
    new CreateGenre(genresInMemoryRepository),
  )
  createGenreController.handle(request, response)
})

genreRoutes.get('/genres', (request: Request, response: Response) => {
  const listGenresController = new ListGenresController(
    new ListGenres(genresInMemoryRepository),
  )
  listGenresController.handle(request, response)
})

export { genreRoutes }
