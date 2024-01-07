import { Router, Request, Response } from 'express'
import { ComicsInMemoryRepository } from '@/infrastructure/repositories/inmemory/ComicsInMemoryRepository'
import { ChaptersInMemoryRepository } from '@/infrastructure/repositories/inmemory/ChaptersInMemoryRepository'
import { AddChaptersToComicControllerFactory } from '@/infrastructure/express/factory/AddChaptersToComicControllerFactory'

const chapterRoutes = Router()
const comicsRepository = new ComicsInMemoryRepository()
const chaptersRepository = new ChaptersInMemoryRepository()
chapterRoutes.post('/chapters', (request: Request, response: Response) => {
  AddChaptersToComicControllerFactory.make(
    chaptersRepository,
    comicsRepository,
  ).handle(request, response)
})
export { chapterRoutes }
