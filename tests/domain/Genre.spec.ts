import { Genre } from '@/domain/Genre'
import { InvalidParameterError } from '@/domain/errors/InvalidParameterError'
import { IdGenerateService } from '@/infrastructure/services/IdGenerateService'

describe('Genre Test', () => {
  test('should be create a new Genre', () => {
    const sut = Genre.create('Fantasia')
    expect(sut.id).toBeTruthy()
    expect(sut.name).toBe('Fantasia')
    expect(sut.createdAt).toBeTruthy()
  })

  test('should not create a new Genre with a name that is made up of numbers', () => {
    const nameInvalid = '1235'
    expect(() => Genre.create(nameInvalid)).toThrow(
      new InvalidParameterError(
        `The property name cannot contain special symbols or numbers`,
      ),
    )
  })

  test('You should not create a new Genre with a name that is made up of characters and symbols', () => {
    const nameInvalid = 'Fantasi@'
    expect(() => Genre.create(nameInvalid)).toThrow(
      new InvalidParameterError(
        `The property name cannot contain special symbols or numbers`,
      ),
    )
  })

  test('You should restore a Genre', () => {
    const sut = Genre.restore(IdGenerateService.ULID(), 'Fantasia', new Date())
    expect(sut.id).toBeTruthy()
    expect(sut.name).toBeTruthy()
    expect(sut.createdAt).toBeTruthy()
  })
})
