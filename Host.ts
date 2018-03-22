import Game, { Piece } from './Game'
import Player from './Player'

interface HistoryItem {
  table: number[]
  position: number
  turn: Piece
}

class Host {
  public readonly game: Game = new Game()
  private turn: Piece = Piece.X
  private players: Player[] = []
  private history: HistoryItem[] = []

  constructor(player1: Player, player2: Player) {
    this.players = [player1, player2]
    player1.piece = Piece.X
    player2.piece = Piece.Z
  }

  public play() {
    while (!this.game.hasWinner()) {
      const position: number = this.players[this.turn].getPosition(this.game)

      if (this.game.isPositionEmpty(position)) {
        this.history.push({ table: this.game.getBoard(), position, turn: this.turn })
        this.game.fillPosition(position, this.turn)
      } else {
        this.game.log()
        throw new Error('Invalid position ' + position)
      }

      this.advanceTurn()
    }

    this.game.log()
    console.log(Piece[this.game.getWinner()!])
  }

  private advanceTurn() {
    this.turn = (this.turn + 1) % 2
  }
}

export default Host
