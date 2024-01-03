import { Router, Request, Response } from 'express'
import { CreateComicControllerFactory } from '@/infrastructure/express/factory/CreateComicControllerFactory'
import { ComicsInMemoryRepository } from '@/infrastructure/repositories/inmemory/ComicsInMemoryRepository'
import { ChaptersInMemoryRepository } from '@/infrastructure/repositories/inmemory/ChaptersInMemoryRepository'

const comicsRouters = Router()
const comicsRepository = new ComicsInMemoryRepository()
const chaptersRepository = new ChaptersInMemoryRepository()

comicsRouters.post('/comics', (request: Request, response: Response) => {
  CreateComicControllerFactory.make(
    comicsRepository,
    chaptersRepository,
  ).handle(request, response)
})

export { comicsRouters }
