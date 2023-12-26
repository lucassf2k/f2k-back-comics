export type ListCategoriesOutPut = {
  id: string
  name: string
  createdAt: Date
}

export interface IListCategories {
  execute(): Promise<ListCategoriesOutPut[]>
}
