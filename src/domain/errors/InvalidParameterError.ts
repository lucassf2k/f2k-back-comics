export class InvalidParameterError extends Error {
  constructor(param: string) {
    super()
    this.name = 'InvalidParameterError'
    this.message = param
  }
}
