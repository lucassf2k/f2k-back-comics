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
  private readonly _id: string
  private readonly props: Required<UserProps>

  private constructor(id: string, props: UserProps) {
    this._id = id
    this.props = props
  }

  static create(props: UserProps): User {
    const newId = IdGenerateService.ULID()
    return new User(newId, props)
  }

  static restore(
    id: string,
    username: string,
    email: Email,
    password: IPassword,
    privilege: Privileges,
  ): User {
    return new User(id, { username, email, password, privilege })
  }

  updateUsername(value: string): void {
    if (value) this.props.username = value
  }

  updateEmail(value: Email): void {
    if (value) this.props.email = value
  }

  updatePassword(value: IPassword): void {
    if (value) this.props.password = value
  }

  updatePrivilege(value: Privileges): void {
    if (value) this.props.privilege = value
  }

  get id(): string {
    return this._id
  }

  get username(): string {
    return this.props.username
  }

  get email(): Email {
    return this.props.email
  }

  get password(): IPassword {
    return this.props.password
  }

  get privilege(): Privileges {
    return this.props.privilege
  }
}
