import 'dotenv/config'
const DB_NAME = String(process.env.DB_NAME)
const DB_PORT = Number(process.env.DB_PORT)
const DB_USERNAME = String(process.env.DB_USERNAME)
const DB_PASSWORD = String(process.env.DB_PASSWORD)
const DB_URL = String(process.env.DB_URL)
export const DbEnvs = Object.freeze({
  DB_NAME,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_URL,
})
