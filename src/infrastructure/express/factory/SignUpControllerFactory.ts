import { SignUp } from '@/application/usecases/SignUp'
import { IUsersRepository } from '@/application/repositories/IUsersRepository'
import { SignUpController } from '@/infrastructure/express/controllers/SignUpController'

export class SignUpControllerFactory {
  static make(usersRepository: IUsersRepository): SignUpController {
    const signUp = new SignUp(usersRepository)
    return new SignUpController(signUp)
  }
}
