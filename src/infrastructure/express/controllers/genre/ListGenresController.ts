import type { Request, Response } from 'express'
import { IListGenres } from '@/domain/usecases/genre/IListGenres'

export class ListGenresController {
  constructor(private readonly listGenres: IListGenres) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const output = await this.listGenres.execute()
    return response.json(output)
  }
}
