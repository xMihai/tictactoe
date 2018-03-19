import Table, { Piece } from './Table'
import Player from './Player'

interface HistoryItem {
  table: number[]
  position: number
  turn: number
}

class Game {
  private readonly table: Table = new Table()
  private turn: Piece = Math.round(Math.random())

  private history: HistoryItem[] = []

  constructor(private players: Player[]) {}

  public play() {
    while (!this.table.hasWinner()) {
      const position: number = this.players[this.turn].getPosition(this.table)

      if (this.table.isEmpty(position)) {
        this.history.push({ table: this.table.toArray(), position, turn: this.turn })
        this.table.fill(position, this.turn)
      } else throw new Error('invalid move')

      this.advanceTurn()
    }
  }

  private advanceTurn() {
    this.turn = (this.turn + 1) % 2
  }
}
