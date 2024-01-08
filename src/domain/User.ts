import { Email } from '@/domain/Email'
import { Privileges } from '@/domain/enums/Privileges'
import { IPassword } from '@/domain/password/IPassword'
import { IdGenerateService } from '@/infrastructure/services/IdGenerateService'

export type UserProps = {
  username: string
  email: Email
  password: IPassword
  privilege: Privileges
}

export class User {
  private constructor(
    readonly id: string,
    readonly username: string,
    readonly email: Email,
    readonly password: IPassword,
    readonly privilege: Privileges,
  ) {}

  static create(props: UserProps): User {
    const newId = IdGenerateService.ULID()
    return new User(
      newId,
      props.username,
      props.email,
      props.password,
      props.privilege,
    )
  }

  static restore(
    id: string,
    username: string,
    email: Email,
    password: IPassword,
    privileges: Privileges,
  ): User {
    return new User(id, username, email, password, privileges)
  }
}
