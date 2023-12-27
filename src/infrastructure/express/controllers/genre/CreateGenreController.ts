import type { Request, Response } from 'express'
import {
  CreateGenreInput,
  ICreateGenre,
} from '@/domain/usecases/genre/ICreateGenre'
import { HttpStatusCodes } from '@/application/enums/HttpStatusCodes'

export class CreateGenreController {
  constructor(private readonly createGenre: ICreateGenre) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const input: CreateGenreInput = {
      name: request.body.name,
    }
    const { url } = await this.createGenre.execute(input)
    return response.status(HttpStatusCodes.CREATED).header('location', url)
  }
}
