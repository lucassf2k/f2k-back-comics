import { Request, Response } from 'express'
import { ISignUp, SignUpInput } from '@/application/usecases/protocols/ISignUp'
import { errorHandler } from '@/infrastructure/express/middlewares/errorHandler'

export class SignUpController {
  constructor(private readonly signUp: ISignUp) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const input = request.body as SignUpInput
      const output = await this.signUp.execute(input)
      return response.location(output.location).send()
    } catch (error) {
      errorHandler(error, request, response)
    }
  }
}
