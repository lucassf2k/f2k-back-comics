import type { Request, Response } from 'express'
import {
  CreateGenreInput,
  ICreateGenre,
} from '@/application/usecases/protocols/ICreateGenre'
import { InvalidParameterError } from '@/domain/errors/InvalidParameterError'
import { errorHandler } from '@/infrastructure/express/middlewares/errorHandler'

export class CreateGenreController {
  constructor(private readonly createGenre: ICreateGenre) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const input: CreateGenreInput = request.body
      if (!input.name) throw new InvalidParameterError('Name field is required')
      const { url } = await this.createGenre.execute(input)
      return response.location(url).send()
    } catch (error) {
      errorHandler(error, request, response)
    }
  }
}
