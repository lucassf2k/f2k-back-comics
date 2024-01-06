import {
  IListComics,
  ListComicsOutPut,
} from '@/application/usecases/protocols/IListComics'
import { IComicsRepository } from '@/application/repositories/IComicsRepository'

export class ListComics implements IListComics {
  constructor(private readonly comicsRepository: IComicsRepository) {}

  async execute(): Promise<ListComicsOutPut[]> {
    const comics = await this.comicsRepository.list()
    return comics.map((comic) => {
      return {
        id: comic.id,
        name: comic.name,
        synopsis: comic.synopsis,
        releaseDate: comic.releaseDate,
        authorName: comic.authorName,
        coverPath: comic.coverPath,
        genres: comic.genres.map((genre) => {
          return {
            id: genre.id,
            name: genre.name,
          }
        }),
        chapters: comic.chapters.map((chapter) => {
          return {
            id: chapter.id,
            number: chapter.number,
            title: chapter.title,
            releaseDate: chapter.releaseDate,
            path: chapter.path,
          }
        }),
      }
    })
  }
}
