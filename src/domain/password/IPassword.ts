export interface IPassword {
  value: string
  salt: string
  algorithm: string
  validate(password: string): boolean
}
