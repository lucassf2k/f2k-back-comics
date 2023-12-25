import { Category } from '@/domain/category/Category'
import { InvalidParameterError } from '@/domain/errors/InvalidParameterError'

describe('Category Test', () => {
  test('should be create a new category', () => {
    const sut = Category.create('Fantasia')
    expect(sut.id).toBeTruthy()
    expect(sut.name).toBe('Fantasia')
    expect(sut.createdAt).toBeTruthy()
  })

  test('should not create a new category with a name that is made up of numbers', () => {
    const nameInvalid = '1235'
    expect(() => Category.create(nameInvalid)).toThrow(
      new InvalidParameterError(nameInvalid),
    )
  })

  test('You should not create a new category with a name that is made up of characters and symbols', () => {
    const nameInvalid = 'Fantasi@'
    expect(() => Category.create(nameInvalid)).toThrow(
      new InvalidParameterError(nameInvalid),
    )
  })
})
