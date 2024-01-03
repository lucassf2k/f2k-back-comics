import { Router, Request, Response } from 'express'
import { CreateComicControllerFactory } from '@/infrastructure/express/factory/CreateComicControllerFactory'
import { ComicsInMemoryRepository } from '@/infrastructure/repositories/inmemory/ComicsInMemoryRepository'
import { ChaptersInMemoryRepository } from '@/infrastructure/repositories/inmemory/ChaptersInMemoryRepository'
import { ListComicsControllerFactory } from '../factory/ListComicsControllerFactory'

const comicsRoutes = Router()
const comicsRepository = new ComicsInMemoryRepository()
const chaptersRepository = new ChaptersInMemoryRepository()

comicsRoutes.post('/comics', (request: Request, response: Response) => {
  CreateComicControllerFactory.make(
    comicsRepository,
    chaptersRepository,
  ).handle(request, response)
})

comicsRoutes.get('/comics', (request: Request, response: Response) => {
  ListComicsControllerFactory.make(comicsRepository).handle(request, response)
})

export { comicsRoutes }
