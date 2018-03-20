import Game, { Piece } from './Game'
import Player from './Player'

interface HistoryItem {
  table: number[]
  position: number
  turn: number
}

class Host {
  public readonly game: Game = new Game()
  private turn: Piece = Math.round(Math.random())

  private history: HistoryItem[] = []

  constructor(private players: Player[]) {}

  public play() {
    while (!this.game.hasWinner()) {
      const position: number = this.players[this.turn].getPosition(this.game)

      if (this.game.isPositionEmpty(position)) {
        this.history.push({ table: this.game.getBoard(), position, turn: this.turn })
        this.game.fillPosition(position, this.turn)
      } else throw new Error('invalid move')

      this.advanceTurn()
    }
  }

  private advanceTurn() {
    this.turn = (this.turn + 1) % 2
  }
}

export default Host
