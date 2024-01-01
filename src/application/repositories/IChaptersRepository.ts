import { IRepository } from '@/application/repositories/IRepository'
import { Chapter } from '@/domain/Chapter'

export interface IChaptersRepository extends IRepository<Chapter, string> {
  getByTitle(input: string): Promise<Chapter>
}
