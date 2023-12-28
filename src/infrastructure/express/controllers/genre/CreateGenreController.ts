import type { Request, Response } from 'express'
import {
  CreateGenreInput,
  ICreateGenre,
} from '@/domain/usecases/genre/ICreateGenre'
import { ApiError } from '@/domain/errors/ApiError'
import { HttpStatusCodes } from '@/application/enums/HttpStatusCodes'

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
      if (error instanceof ApiError) {
        return response.status(error.code).send(error.message)
      }
      return response
        .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .send('Internal server error')
    }
  }
}
