import { IdGenerate } from '@/domain/IdGenerate'

const REGEX_TO_VALIDATE_UUID =
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/

describe('IdGenerate Test', () => {
  test('should be return a valid uuid', () => {
    const sut = IdGenerate.uuid()
    const isUuidValid = REGEX_TO_VALIDATE_UUID.test(sut)
    expect(isUuidValid).toBeTruthy()
  })

  test('should be not return a valid uuid', () => {
    const sut = IdGenerate.uuid() + 'dad'
    const isUuidValid = REGEX_TO_VALIDATE_UUID.test(sut)
    expect(isUuidValid).toBeFalsy()
  })
})
