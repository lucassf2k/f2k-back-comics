export type CreateCategoryInput = {
  name: string
}

export type CreateCategoryOutPut = {
  url: string
}

export interface ICreateCategory {
  execute(input: CreateCategoryInput): Promise<CreateCategoryOutPut>
}
