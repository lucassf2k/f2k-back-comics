import type { Request, Response } from 'express'
import {
  GetComicsOfNameInput,
  IGetComicsOfName,
} from '@/application/usecases/protocols/IGetComicsOfName'
import { errorHandler } from '@/infrastructure/express/middlewares/errorHandler'

export class GetComicOfNameController {
  constructor(private readonly getComicOfName: IGetComicsOfName) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const input = request.query as GetComicsOfNameInput
      const output = await this.getComicOfName.execute(input)
      return response.json(output)
    } catch (error) {
      errorHandler(error, request, response)
    }
  }
}
