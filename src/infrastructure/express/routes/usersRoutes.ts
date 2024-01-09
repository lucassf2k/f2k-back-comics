import { Router, Request, Response } from 'express'
import { SignUpControllerFactory } from '@/infrastructure/express/factory/SignUpControllerFactory'
import { UsersInMemoryRepository } from '@/infrastructure/repositories/inmemory/UsersInMemoryRepository'

const usersRoutes = Router()
const usersRepository = new UsersInMemoryRepository()
usersRoutes.post('/signup', (request: Request, response: Response) => {
  SignUpControllerFactory.make(usersRepository).handle(request, response)
})
export { usersRoutes }
