import MinimaxPlayer from './MinimaxPlayer'
import { Piece } from './Game'

describe('MinimaxPlayer', () => {
  test('getResults', () => {
    expect(MinimaxPlayer.getMinimax([1, 0, 1, 1, 0, 1, 0, 1, 0.5], Piece.X)).toEqual({
      bestPosition: 8,
      bestResult: 0.5,
    })

    expect(MinimaxPlayer.getMinimax([0, 1, 0, 1, 1, 0, 1, 0, 0.5], Piece.X)).toEqual({
      bestPosition: 8,
      bestResult: 1,
    })

    expect(MinimaxPlayer.getMinimax([0, 1, 0, 1, 1, 0, 0, 0.5, 0.5], Piece.Z)).toEqual({
      bestPosition: 7,
      bestResult: 1,
    })

    expect(MinimaxPlayer.getMinimax([0, 1, 0, 1, 1, 0, 0.5, 0.5, 0.5], Piece.X)).toEqual({
      bestPosition: 8,
      bestResult: 1,
    })

    expect(MinimaxPlayer.getMinimax([0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5], Piece.X)).toEqual({
      bestPosition: 0,
      bestResult: 0.5,
    })
  })
})
