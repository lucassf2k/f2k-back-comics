/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Router, Request, Response } from 'express'
import { GenresInMemoryRepository } from '@/infrastructure/repositories/inmemory/GenresInMemoryRepository'
import { ListGenresControllerFactory } from '@/infrastructure/express/factory/genre/ListGenresControllerFactory'
import { CreateGenreControllerFactory } from '@/infrastructure/express/factory/genre/CreateGenreControllerFactory'

const genreRoutes = Router()
const genresInMemoryRepository = new GenresInMemoryRepository()

genreRoutes.post('/genres', (request: Request, response: Response) => {
  CreateGenreControllerFactory.make(genresInMemoryRepository).handle(
    request,
    response,
  )
})

genreRoutes.get('/genres', (request: Request, response: Response) => {
  ListGenresControllerFactory.make(genresInMemoryRepository).handle(
    request,
    response,
  )
})

export { genreRoutes }
