import {
  CreateComicInput,
  ICreateComic,
} from '@/application/usecases/protocols/ICreateComic'
import type { Request, Response } from 'express'
import { errorHandler } from '../middlewares/errorHandler'

export class CreateComicController {
  constructor(private readonly createComic: ICreateComic) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const input: CreateComicInput = request.body
      const output = await this.createComic.execute(input)
      return response.setHeader('location', output.location)
    } catch (error) {
      errorHandler(error, request, response)
    }
  }
}
