import Table from './Table'

describe('Table', () => {
  test('empty constructor', () => {
    expect(new Table().toArray()).toEqual([0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5])
    expect(new Table([0, 1, 0, 1, 0, 1, 0, 1, 0]).toArray()).toEqual([0, 1, 0, 1, 0, 1, 0, 1, 0])
    expect(new Table([0, 1, 0, 1, 0, 1, 0, 1]).toArray()).toEqual([0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5])
  })

  test('isValid', () => {
    const isValid = new Table().isValid
    expect(isValid([0, 1, 0, 1, 0, 1, 0, 1, 0])).toBe(true)
    expect(isValid([0, 1, 0.5, 0, 1, 0.5, 0, 1, 0.5])).toBe(true)

    expect(isValid([0.1, 1, 0.5, 0, 1, 0.5, 0, 1, 0.5])).toBe(false)
    expect(isValid([0, 1, 0.5, 0, 1, 0.5, 0, 1])).toBe(false)
  })
})
