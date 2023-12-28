import type { Request, Response } from 'express'
import {
  CreateGenreInput,
  ICreateGenre,
} from '@/domain/usecases/genre/ICreateGenre'
import { HttpStatusCodes } from '@/application/enums/HttpStatusCodes'
import { errorHandler } from '../../middlewares/errorHandler'
import { InvalidParameterError } from '@/domain/errors/InvalidParameterError'

export class CreateGenreController {
  constructor(private readonly createGenre: ICreateGenre) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const input: CreateGenreInput = request.body
      if (!input.name) throw new InvalidParameterError('Name field is required')
      const { url } = await this.createGenre.execute(input)
      return response
        .setHeader('location', url)
        .sendStatus(HttpStatusCodes.CREATED)
    } catch (error) {
      errorHandler(error, request, response)
    }
  }
}
