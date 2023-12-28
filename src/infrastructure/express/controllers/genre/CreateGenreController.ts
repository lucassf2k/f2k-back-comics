import type { Request, Response } from 'express'
import {
  CreateGenreInput,
  ICreateGenre,
} from '@/domain/usecases/genre/ICreateGenre'
import { HttpStatusCodes } from '@/application/enums/HttpStatusCodes'
import { errorHandler } from '../../middlewares/errorHandler'

export class CreateGenreController {
  constructor(private readonly createGenre: ICreateGenre) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const input: CreateGenreInput = request.body
      const { url } = await this.createGenre.execute(input)
      return response
        .setHeader('location', url)
        .sendStatus(HttpStatusCodes.CREATED)
    } catch (error) {
      errorHandler(error, request, response)
    }
  }
}
