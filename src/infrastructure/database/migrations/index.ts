import readline from 'node:readline'
import { resolve, join } from 'node:path'
import { createWriteStream } from 'node:fs'

async function createMigration(): Promise<void> {
  const cin = async (text: string): Promise<string> => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })
    return new Promise((resolve) => {
      rl.question(text, (answer) => {
        resolve(answer)
        rl.close()
      })
    })
  }

  const FILE_PATH = resolve(__dirname, '.')
  const TIMESTAMP = new Date().getTime()
  const EXT = '.ts'
  const migrationName = await cin('migration name: ')
  const filename = `${TIMESTAMP}-${migrationName}${EXT}`
  const filePath = join(FILE_PATH, filename)
  const fileStream = createWriteStream(filePath)
  fileStream.write(
    `import { PostgresPromiseConnection } from '@/infrastructure/database/PostgresPromiseConnection'

async function sql(): Promise<void> {
  const connection = PostgresPromiseConnection.getInstance()
  await connection.query('', [])
}
sql()
`,
  )
  fileStream.end()
}

createMigration()
