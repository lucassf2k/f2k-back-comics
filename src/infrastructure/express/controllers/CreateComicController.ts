import type { Request, Response } from 'express'
import {
  CreateComicInput,
  ICreateComic,
} from '@/application/usecases/protocols/ICreateComic'
import { errorHandler } from '@/infrastructure/express/middlewares/errorHandler'

export class CreateComicController {
  constructor(private readonly createComic: ICreateComic) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const input: CreateComicInput = request.body
      const output = await this.createComic.execute(input)
      return response.location(output.location).send()
    } catch (error) {
      errorHandler(error, request, response)
    }
  }
}
