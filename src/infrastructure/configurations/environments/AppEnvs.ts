const APP_PORT = Number(process.env.APP_PORT)
const APP_SECRET_KEY = String(process.env.APP_SECRET_KEY)
export const AppEnvs = Object.freeze({
  APP_PORT,
  APP_SECRET_KEY,
})
