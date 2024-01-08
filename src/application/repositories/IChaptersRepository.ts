import { Chapter } from '@/domain/Chapter'
import { IRepository } from '@/application/repositories/IRepository'

export interface IChaptersRepository extends IRepository<Chapter, string> {
  getOfTitle(input: string): Promise<Chapter>
}
