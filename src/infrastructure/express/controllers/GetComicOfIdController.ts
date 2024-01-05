import type { Request, Response } from 'express'
import {
  GetComicOfIdInput,
  IGetComicOfId,
} from '@/application/usecases/protocols/IGetComicOfId'
import { errorHandler } from '@/infrastructure/express/middlewares/errorHandler'

export class GetComicOfIdController {
  constructor(private readonly getComicOfId: IGetComicOfId) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const input = request.params as GetComicOfIdInput
      const output = await this.getComicOfId.execute(input)
      return response.json(output)
    } catch (error) {
      errorHandler(error, request, response)
    }
  }
}
