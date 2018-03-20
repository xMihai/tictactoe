import Game from './Game'

interface Player {
  getPosition(game: Game): number
}

export default Player
