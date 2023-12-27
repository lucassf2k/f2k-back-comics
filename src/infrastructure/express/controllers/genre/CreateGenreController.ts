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
      const input: CreateGenreInput = {
        name: request.body.name,
      }
      const { url } = await this.createGenre.execute(input)
      return response
        .setHeader('location', url)
        .sendStatus(HttpStatusCodes.CREATED)
    } catch (err) {
      if (err instanceof ApiError) {
        return response
          .status(err.code)
          .json({ name: err.name, message: err.message })
      }
      return response.sendStatus(HttpStatusCodes.INTERNAL_SERVER_ERROR)
    }
  }
}
