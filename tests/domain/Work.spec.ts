import { Work } from '@/domain/Work'

describe('Work Test', () => {
  test('should be create work', () => {
    const sut = new Work(
      'Crônicas nas Estrelas',
      new Date(),
      'comics/154546/15487.pdf',
    )
    expect(sut).toHaveProperty('id')
    expect(sut).toHaveProperty('title')
    expect(sut).toHaveProperty('releaseDate')
    expect(sut).toHaveProperty('idComic')
  })
})
