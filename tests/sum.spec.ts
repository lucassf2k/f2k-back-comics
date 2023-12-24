describe('Sum', () => {
  test('shuld be sum two values', () => {
    const [a, b] = [5, 5] as const
    const sum = a + b
    expect(sum).toBe(10)
  })
})
