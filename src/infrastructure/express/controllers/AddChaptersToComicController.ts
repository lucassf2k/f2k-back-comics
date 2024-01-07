import { Request, Response } from 'express'
import { InvalidParameterError } from '@/domain/errors/InvalidParameterError'
import { AddChaptersToComic } from '@/application/usecases/AddChaptersToComic'
import { errorHandler } from '@/infrastructure/express/middlewares/errorHandler'
import { AddChaptersToComicInput } from '@/application/usecases/protocols/IAddChaptersToComic'

export class AddChaptersToComicController {
  constructor(private readonly addChaptersToComic: AddChaptersToComic) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const input = request.body as AddChaptersToComicInput
      if (!input.idComic) {
        throw new InvalidParameterError('Field id of comic is required.')
      }
      const output = await this.addChaptersToComic.execute(input)
      return response.location(output.location).send()
    } catch (error) {
      errorHandler(error, request, response)
    }
  }
}
