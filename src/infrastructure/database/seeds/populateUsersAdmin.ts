import { Email } from '@/domain/Email'
import { User, UserProps } from '@/domain/User'
import { Privileges } from '@/domain/enums/Privileges'
import { PBKDF2Password } from '@/domain/password/PBKDF2Password'
import { IConnection } from '@/infrastructure/database/protocols/IConnection'
import { PostgresPromiseConnection } from '@/infrastructure/database/PostgresPromiseConnection'

async function populateUsersAdmin(connection: IConnection): Promise<void> {
  const newAdminUserProps: UserProps = {
    username: 'admin',
    email: new Email('admin@f2k.com'),
    password: PBKDF2Password.create('123456'),
    privilege: Privileges.ADMIN,
  }
  const newAdminUser = User.create(newAdminUserProps)
  await connection.query(
    'insert into f2k_comics.users(id, username, email, privilege, password, algorithm_password, salt_password, created_at) values ($1, $2, $3, $4, $5, $6, $7, $8)',
    [
      newAdminUser.id,
      newAdminUser.username,
      newAdminUser.email.value,
      newAdminUser.privilege,
      newAdminUser.password.value,
      newAdminUser.password.algorithm,
      newAdminUser.password.salt,
      new Date(),
    ],
  )
  await connection.close()
}

populateUsersAdmin(PostgresPromiseConnection.getInstance())
