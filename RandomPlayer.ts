import Game from './Game'
import Player from './Player'
import { Piece } from './Game'

class RandomPlayer extends Player {
  public getPosition(game: Game): number {
    const validPositions: number[] = game.getEmptyPositions()
    return validPositions[Math.floor(Math.random() * validPositions.length)]
  }
}

export default RandomPlayer
