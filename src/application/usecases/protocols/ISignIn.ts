export type SignInInput = {
  email: string
  password: string
}
export type SignInOutPut = {
  token: string
}

export interface ISignIn {
  execute(input: SignInInput): Promise<SignInOutPut>
}
