import { Chapter } from '@/domain/Chapter'

describe('Chapter Test', () => {
  test('should be create a chapter', () => {
    const sut = new Chapter(
      '001',
      'Noite clara',
      new Date(),
      'comics/1545484/1541456.png',
      'comics/1545484/156484.pdf',
    )
    expect(sut).toHaveProperty('id')
    expect(sut).toHaveProperty('number')
    expect(sut).toHaveProperty('title')
    expect(sut).toHaveProperty('releaseDate')
    expect(sut).toHaveProperty('coverURL')
    expect(sut).toHaveProperty('contentURL')
  })

  test('should be create a chapter without cover and content urls', () => {
    const sut = new Chapter('001', 'Noite clara', new Date())
    expect(sut).toHaveProperty('id')
    expect(sut).toHaveProperty('number')
    expect(sut).toHaveProperty('title')
    expect(sut).toHaveProperty('releaseDate')
  })

  test('should add cover and content urls', () => {
    const sut = new Chapter('001', 'Noite clara', new Date())
    sut.coverURL = 'comics/154651/15461/262.png'
    sut.contentURL = 'comics/154651/15461/262.pdf'
    expect(sut.coverURL).toBe('comics/154651/15461/262.png')
    expect(sut.contentURL).toBe('comics/154651/15461/262.pdf')
  })
})
