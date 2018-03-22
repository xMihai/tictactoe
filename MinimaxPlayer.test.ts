import MinimaxPlayer from './MinimaxPlayer'
import { Piece } from './Game'

describe('MinimaxPlayer', () => {
  test('getResults one to go', () => {
    console.time()
    expect(MinimaxPlayer.getMinimax([1, 0, 1, 1, 0, 1, 0, 1, 0.5], Piece.X)).toEqual({
      position: 8,
      result: 0.5,
    })
    console.timeEnd()
  })

  test('getResults one to go reverse', () => {
    console.time()
    expect(MinimaxPlayer.getMinimax([0, 1, 0, 1, 1, 0, 1, 0, 0.5], Piece.X)).toEqual({
      position: 8,
      result: 1,
    })
    console.timeEnd()
  })

  test('getResults two to go', () => {
    console.time()
    expect(MinimaxPlayer.getMinimax([0, 1, 0, 1, 1, 0, 0, 0.5, 0.5], Piece.Z)).toEqual({
      position: 7,
      result: 1,
    })
    console.timeEnd()
  })

  test('getResults three to go', () => {
    console.time()
    expect(MinimaxPlayer.getMinimax([0, 1, 0, 1, 1, 0, 0.5, 0.5, 0.5], Piece.X)).toEqual({
      position: 8,
      result: 1,
    })
    console.timeEnd()
  })
})
