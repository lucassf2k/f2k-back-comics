const APP_PORT = Number(process.env.APP_PORT) || 3001
const APP_SECRET_KEY = String(process.env.APP_SECRET_KEY)
const DB_URL = String(process.env.DB_URL)
export const ENV = Object.freeze({
  APP_PORT,
  APP_SECRET_KEY,
  DB_URL,
})
