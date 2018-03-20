import Game from './Game'
import Player from './Player'
import { Piece } from './Table'

class RandomPlayer implements Player {
  public getPosition(game: Game): number {
    const validPositions: number[] = game.table.getEmptyPositions()
    return validPositions[Math.floor(Math.random() * validPositions.length)]
  }
}

export default RandomPlayer
