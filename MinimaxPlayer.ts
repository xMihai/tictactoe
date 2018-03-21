import Game from './Game'
import Player from './Player'
import { Piece } from './Game'

class MinimaxPlayer implements Player {
  public static getMinimax(board: number[], turn: Piece): { bestResult: number; bestPosition: number } {
    const positions = Game.getEmptyPositions(board)

    const results = positions.map(position => {
      const nextBoard = [...board]
      nextBoard[position] = turn
      const winner = Game.getWinner(nextBoard)

      switch (winner) {
        case turn:
          return 1
        case Piece.NONE:
          return 0.5
        case null:
          return 1 - this.getMinimax(nextBoard, 1 - turn).bestResult
        default:
          // the other player
          return 0
      }
    })

    let bestResult: number = -1
    let bestPosition: number = -1

    positions.forEach((_, i) => {
      if (results[i] > bestResult) {
        bestResult = results[i]
        bestPosition = positions[i]
      }
    })

    return { bestResult, bestPosition }
  }

  public getPosition(game: Game): number {
    return 0
  }
}

export default MinimaxPlayer
