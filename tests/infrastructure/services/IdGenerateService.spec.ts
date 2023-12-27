import { IdGenerateService } from '@/infrastructure/services/IdGenerateService'

const REGEX_TO_VALIDATE_UUID =
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/

const REGEX_TO_VALIDATE_ULID = /^[0-9A-Z]{26}$/

describe('IdGenerate Test', () => {
  test('should be return a valid uuid', () => {
    const sut = IdGenerateService.UIID()
    const isUuidValid = REGEX_TO_VALIDATE_UUID.test(sut)
    expect(isUuidValid).toBeTruthy()
  })

  test('should be not return a valid uuid', () => {
    const sut = IdGenerateService.UIID() + 'dad'
    const isUuidValid = REGEX_TO_VALIDATE_UUID.test(sut)
    expect(isUuidValid).toBeFalsy()
  })

  test('should be return a valid ULID', () => {
    const sut = IdGenerateService.ULID()
    const isUuidValid = REGEX_TO_VALIDATE_ULID.test(sut)
    expect(isUuidValid).toBeTruthy()
  })
})
