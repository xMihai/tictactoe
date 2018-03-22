import Board, { Piece } from './Board'
import Player from './Player'

class RandomPlayer extends Player {
  public getPosition(board: Board): number {
    const validPositions: number[] = board.getEmptyPositions()
    return validPositions[Math.floor(Math.random() * validPositions.length)]
  }
}

export default RandomPlayer
