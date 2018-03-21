import Game, { Piece } from './Game'

describe('Game', () => {
  test('Piece', () => {
    expect(Piece.NONE).toBe(0.5)
    expect(Piece.X).toBe(0)
    expect(Piece.Z).toBe(1)
    expect(Piece[0]).toBe('X')
    expect(Piece[1]).toBe('Z')
    expect(Piece[0.5]).toBe('NONE')
  })

  test('empty constructor', () => {
    expect(new Game().getBoard()).toEqual([0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5])
    expect(new Game([0, 1, 0, 1, 0, 1, 0, 1, 0]).getBoard()).toEqual([0, 1, 0, 1, 0, 1, 0, 1, 0])
    expect(new Game([0, 1, 0, 1, 0, 1, 0, 1]).getBoard()).toEqual([0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5])
  })

  test('isValid', () => {
    expect(Game.isValid([0, 1, 0, 1, 0, 1, 0, 1, 0])).toBe(true)
    expect(Game.isValid([0, 1, 0.5, 0, 1, 0.5, 0, 1, 0.5])).toBe(true)

    expect(Game.isValid([0.1, 1, 0.5, 0, 1, 0.5, 0, 1, 0.5])).toBe(false)
    expect(Game.isValid([0, 1, 0.5, 0, 1, 0.5, 0, 1])).toBe(false)
  })

  test('getEmptyPositions', () => {
    expect(new Game().getEmptyPositions()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8])
    expect(new Game([0, 0, 0, 0.5, 0.5, 0.5, 1, 1, 1]).getEmptyPositions()).toEqual([3, 4, 5])
    expect(new Game([0, 0.5, 1, 0, 0.5, 1, 0, 0.5, 1]).getEmptyPositions()).toEqual([1, 4, 7])
  })
})
