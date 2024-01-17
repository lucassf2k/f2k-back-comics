/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-use-before-define */
import pgp from 'pg-promise'
import { ENV } from '@/infrastructure/configurations/environments'
import { IConnection } from '@/infrastructure/database/protocols/IConnection'

export class PostgresPromiseConnection implements IConnection {
  private static instance: IConnection
  private readonly connection: any

  private constructor() {
    this.connection = pgp()(ENV.DB_URL)
  }

  static getInstance(): IConnection {
    if (!PostgresPromiseConnection.instance) {
      PostgresPromiseConnection.instance = new PostgresPromiseConnection()
    }
    return PostgresPromiseConnection.instance
  }

  query(statement: string, input: any): Promise<any> {
    return this.connection.query(statement, input)
  }

  async close(): Promise<void> {
    await this.connection.$pool.end()
  }
}
