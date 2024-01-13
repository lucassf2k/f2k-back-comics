import { Chapter, ChapterProps } from '@/domain/Chapter'
import { IChaptersRepository } from '@/application/repositories/IChaptersRepository'
import { ChaptersInMemoryRepository } from '@/infrastructure/repositories/inmemory/ChaptersInMemoryRepository'

let chaptersInMemoryRepository: IChaptersRepository

describe('ChaptersInMemoryRepository Test', () => {
  beforeEach(() => {
    chaptersInMemoryRepository = new ChaptersInMemoryRepository()
  })

  test('should store a chapter', async () => {
    const chapterProps: ChapterProps = {
      number: '001',
      title: 'Title Test',
      releaseDate: new Date(),
    }
    const newChapter = Chapter.create(chapterProps)
    await chaptersInMemoryRepository.save(newChapter)
    const output = await chaptersInMemoryRepository.list()
    expect(output.length).toBe(1)
  })

  test('should list all chapters', async () => {
    const chapterProps: ChapterProps = {
      number: '001',
      title: 'Title Test',
      releaseDate: new Date(),
    }
    const newChapter1 = Chapter.create(chapterProps)
    await chaptersInMemoryRepository.save(newChapter1)
    const newChapter2 = Chapter.create({
      number: '002',
      title: 'Title2 Test',
      releaseDate: new Date(),
    })
    await chaptersInMemoryRepository.save(newChapter2)
    const output = await chaptersInMemoryRepository.list()
    expect(output.length).toBe(2)
  })

  test('should delete a chapter and get by id', async () => {
    const chapterProps: ChapterProps = {
      number: '001',
      title: 'Title Test',
      releaseDate: new Date(),
    }
    const newChapter1 = Chapter.create(chapterProps)
    await chaptersInMemoryRepository.save(newChapter1)
    const newChapter2 = Chapter.create({
      number: '002',
      title: 'Title2 Test',
      releaseDate: new Date(),
    })
    await chaptersInMemoryRepository.save(newChapter2)
    await chaptersInMemoryRepository.delete(newChapter1.id)
    const output = await chaptersInMemoryRepository.list()
    const chapter = await chaptersInMemoryRepository.getOfId(newChapter2.id)
    expect(output.length).toBe(1)
    expect(chapter.id).toStrictEqual(newChapter2.id)
  })

  test('should get by title chapter', async () => {
    const chapterProps: ChapterProps = {
      number: '001',
      title: 'Title Test',
      releaseDate: new Date(),
    }
    const newChapter1 = Chapter.create(chapterProps)
    await chaptersInMemoryRepository.save(newChapter1)
    const output = await chaptersInMemoryRepository.getOfTitle(
      newChapter1.title,
    )
    expect(output.title).toStrictEqual(newChapter1.title)
    expect(output.id).toStrictEqual(newChapter1.id)
  })

  test('should update a chapter', async () => {
    const chapterProps: ChapterProps = {
      number: '001',
      title: 'Title Test',
      releaseDate: new Date(),
    }
    const newChapter1 = Chapter.create(chapterProps)
    await chaptersInMemoryRepository.save(newChapter1)
    const chapterToUpdate = Chapter.create({
      number: '002',
      title: 'Title Updated',
      releaseDate: new Date(),
    })
    await chaptersInMemoryRepository.update(chapterToUpdate, newChapter1.id)
    const output = await chaptersInMemoryRepository.getOfId(newChapter1.id)
    expect(output.id).toStrictEqual(newChapter1.id)
    expect(output.number).toStrictEqual(newChapter1.number)
    expect(output.title).toStrictEqual(chapterToUpdate.title)
  })
})
