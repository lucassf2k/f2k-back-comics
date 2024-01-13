import { Name } from '@/domain/Name'
import { Chapter } from '@/domain/Chapter'
import { Comic, ComicProps } from '@/domain/Comic'
import { IComicsRepository } from '@/application/repositories/IComicsRepository'
import { ComicsInMemoryRepository } from '@/infrastructure/repositories/inmemory/ComicsInMemoryRepository'

let comicsInMemoryRepository: IComicsRepository

describe('ComicsInMemoryRepository Test', () => {
  beforeEach(() => {
    comicsInMemoryRepository = new ComicsInMemoryRepository()
  })

  test('should store a Comic', async () => {
    const comicProps: ComicProps = {
      name: 'Comic Test',
      synopsis: 'Comic synopsis test',
      releaseDate: new Date(),
      authorName: new Name('Name Test'),
    }
    const newComic = new Comic(comicProps)
    await comicsInMemoryRepository.save(newComic)
    const output = await comicsInMemoryRepository.list()
    expect(output.length).toBe(1)
  })

  test('should list all Comics', async () => {
    const comicProps: ComicProps = {
      name: 'Comic Test',
      synopsis: 'Comic synopsis test',
      releaseDate: new Date(),
      authorName: new Name('Name Test'),
    }
    const newComic1 = new Comic(comicProps)
    await comicsInMemoryRepository.save(newComic1)
    const newComic2 = new Comic({
      name: 'Comic2 Test',
      synopsis: 'Comic2 synopsis test',
      releaseDate: new Date(),
      authorName: new Name('Name Test'),
    })
    await comicsInMemoryRepository.save(newComic2)
    const output = await comicsInMemoryRepository.list()
    expect(output.length).toBe(2)
  })

  test('should delete a Comic', async () => {
    const comicProps: ComicProps = {
      name: 'Comic Test',
      synopsis: 'Comic synopsis test',
      releaseDate: new Date(),
      authorName: new Name('Name Test'),
    }
    const newComic1 = new Comic(comicProps)
    await comicsInMemoryRepository.save(newComic1)
    const newComic2 = new Comic({
      name: 'Comic2 Test',
      synopsis: 'Comic2 synopsis test',
      releaseDate: new Date(),
      authorName: new Name('Name Test'),
    })
    await comicsInMemoryRepository.save(newComic2)
    await comicsInMemoryRepository.delete(newComic1.id)
    const output = await comicsInMemoryRepository.list()
    expect(output.length).toBe(1)
  })

  test('should get by name Comic', async () => {
    const comicProps: ComicProps = {
      name: 'Comic Test',
      synopsis: 'Comic synopsis test',
      releaseDate: new Date(),
      authorName: new Name('Name Test'),
    }
    const newComic1 = new Comic(comicProps)
    await comicsInMemoryRepository.save(newComic1)
    const output = await comicsInMemoryRepository.searchByName(newComic1.name)
    expect(output.length).toBe(1)
  })

  test('should update a Comic', async () => {
    const comicProps: ComicProps = {
      name: 'Comic Test',
      synopsis: 'Comic synopsis test',
      releaseDate: new Date(),
      authorName: new Name('Name Test'),
    }
    const newComic1 = new Comic(comicProps)
    await comicsInMemoryRepository.save(newComic1)
    const comicToUpdate = new Comic({
      name: 'Comic Updated',
      synopsis: 'Comic synopsis test',
      releaseDate: new Date(),
      authorName: new Name('Name Updated'),
    })
    comicToUpdate.addChapter(
      Chapter.create({
        number: '001',
        title: 'Title Test',
        releaseDate: new Date(),
      }),
    )
    await comicsInMemoryRepository.update(comicToUpdate, newComic1.id)
    const output = await comicsInMemoryRepository.getOfId(newComic1.id)
    expect(output.id).toStrictEqual(newComic1.id)
    expect(output.name).toStrictEqual(comicToUpdate.name)
    expect(output.authorName).toStrictEqual(comicToUpdate.authorName)
    expect(output.chapters.length).toBe(1)
  })
})
