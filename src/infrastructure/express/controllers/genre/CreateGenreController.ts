import type { Request, Response } from 'express'
import {
  CreateGenreInput,
  ICreateGenre,
} from '@/domain/usecases/genre/ICreateGenre'
import { HttpStatusCodes } from '@/application/enums/HttpStatusCodes'
import { InvalidParameterError } from '@/domain/errors/InvalidParameterError'

export class CreateGenreController {
  constructor(private readonly createGenre: ICreateGenre) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const input: CreateGenreInput = {
        name: request.body.name,
      }
      const { url } = await this.createGenre.execute(input)
      return response.status(HttpStatusCodes.CREATED).header('location', url)
    } catch (err) {
      if (err instanceof InvalidParameterError) {
        return response
          .status(HttpStatusCodes.BAD_REQUEST)
          .json({ name: err.name, body: err.message })
      }
      return response.sendStatus(HttpStatusCodes.INTERNAL_SERVER_ERROR)
    }
  }
}
