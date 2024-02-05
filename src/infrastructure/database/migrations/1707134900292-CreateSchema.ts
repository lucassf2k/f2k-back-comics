import { PostgresPromiseConnection } from '@/infrastructure/database/PostgresPromiseConnection'

async function sql(): Promise<void> {
  const connection = PostgresPromiseConnection.getInstance()
  await connection.query('', [])
  await connection.close()
}
sql()
