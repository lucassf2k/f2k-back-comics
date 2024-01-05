import { Router, Request, Response } from 'express'
import { ComicsInMemoryRepository } from '@/infrastructure/repositories/inmemory/ComicsInMemoryRepository'
import { ListComicsControllerFactory } from '@/infrastructure/express/factory/ListComicsControllerFactory'
import { CreateComicControllerFactory } from '@/infrastructure/express/factory/CreateComicControllerFactory'
import { ChaptersInMemoryRepository } from '@/infrastructure/repositories/inmemory/ChaptersInMemoryRepository'
import { GetComicOfIdControllerFactory } from '@/infrastructure/express/factory/GetComicOfIdControllerFactory'
import { GetComicOfNameControllerFactory } from '@/infrastructure/express/factory/GetComicOfNameControllerFactory'
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

comicsRoutes.get('/comics/search', (request: Request, response: Response) => {
  GetComicOfNameControllerFactory.make(comicsRepository).handle(
    request,
    response,
  )
})

comicsRoutes.get('/comics/:id', (request: Request, response: Response) => {
  GetComicOfIdControllerFactory.make(comicsRepository).handle(request, response)
})

export { comicsRoutes }
