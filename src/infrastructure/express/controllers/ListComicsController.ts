import type { Request, Response } from 'express'
import { IListComics } from '@/application/usecases/protocols/IListComics'
import { errorHandler } from '@/infrastructure/express/middlewares/errorHandler'

export class ListComicsController {
  constructor(private readonly listComics: IListComics) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const output = await this.listComics.execute()
      return response.json(output)
    } catch (error) {
      errorHandler(error, request, response)
    }
  }
}
