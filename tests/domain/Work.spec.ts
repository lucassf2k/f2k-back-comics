import { Work, WorkProps } from '@/domain/Work'

describe('Work Test', () => {
  test('should be create work', () => {
    const workProps: WorkProps = {
      title: 'Crônicas nas Estrelas',
      releaseDate: new Date(),
      path: 'comics/154546/15487.pdf',
    }
    const sut = new Work(workProps)
    expect(sut).toHaveProperty('id')
    expect(sut).toHaveProperty('title')
    expect(sut).toHaveProperty('releaseDate')
    expect(sut).toHaveProperty('path')
  })

  test('should be update title and path', () => {
    const workProps: WorkProps = {
      title: 'Crônicas nas Estrelas',
      releaseDate: new Date(),
      path: 'comics/154546/15487.pdf',
    }
    const sut = new Work(workProps)
    sut.updateTitle('Estrela do Norte')
    sut.updatePath('asd.pdf')
    expect(sut.title).toStrictEqual('Estrela do Norte')
    expect(sut.path).toStrictEqual('asd.pdf')
  })

  test('should be not update title and path when parameters empty', () => {
    const workProps: WorkProps = {
      title: 'Crônicas nas Estrelas',
      releaseDate: new Date(),
      path: 'comics/154546/15487.pdf',
    }
    const sut = new Work(workProps)
    sut.updateTitle('')
    sut.updatePath('')
    expect(sut.title).toStrictEqual('Crônicas nas Estrelas')
    expect(sut.path).toStrictEqual('comics/154546/15487.pdf')
  })
})
