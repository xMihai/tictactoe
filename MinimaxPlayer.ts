import Game, { Piece } from './Board'
import Player from './Player'

interface Result {
  result: number
  position: number
}

class MinimaxPlayer extends Player {
  public static getMinimax(board: number[], turn: Piece): Result {
    const positions = Game.getEmptyPositions(board)

    const results: Result[] = positions
      .map(position => {
        const nextBoard = [...board]
        nextBoard[position] = turn
        const winner = Game.getWinner(nextBoard)

        switch (winner) {
          case turn:
            return { result: 1, position }
          case Piece.NONE:
            return { result: 0.5, position }
          case null:
            return { result: 1 - this.getMinimax(nextBoard, 1 - turn).result, position }
          default:
            // the other player
            return { result: 0, position }
        }
      })
      .sort((a, b) => b.result - a.result)

    const topResults = results.filter(result => result.result === results[0].result)

    if (topResults.length === 1) return topResults[0]
    else return topResults[Math.floor(Math.random() * topResults.length)]
  }

  public getPosition(game: Game): number {
    if (Game.getEmptyPositions(game.toArray()).length === 9) return Math.floor(Math.random() * 9)
    return MinimaxPlayer.getMinimax(game.toArray(), this.piece).position
  }
}

export default MinimaxPlayer
