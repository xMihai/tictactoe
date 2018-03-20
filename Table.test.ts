import Table, { Piece } from './Table'

describe('Table', () => {
  test('Piece', () => {
    expect(Piece.NONE).toBe(0.5)
    expect(Piece.X).toBe(0)
    expect(Piece.Z).toBe(1)
    expect(Piece[0]).toBe('X')
    expect(Piece[1]).toBe('Z')
    expect(Piece[0.5]).toBe('NONE')
  })

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

  test('getEmptyPositions', () => {
    expect(new Table().getEmptyPositions()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8])
    expect(new Table([0, 0, 0, 0.5, 0.5, 0.5, 1, 1, 1]).getEmptyPositions()).toEqual([3, 4, 5])
    expect(new Table([0, 0.5, 1, 0, 0.5, 1, 0, 0.5, 1]).getEmptyPositions()).toEqual([1, 4, 7])
  })
})
