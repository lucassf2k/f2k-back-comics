export type SignUpInput = {
  username: string
  email: string
  password: string
}
export type SignUpOutPut = {
  location: string
}

export interface ISignUp {
  execute(input: SignUpInput): Promise<SignUpOutPut>
}
