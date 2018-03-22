import Board, { Piece } from './Board'
import Player from './Player'

interface HistoryItem {
  input: number[]
  position: number
  turn: Piece
  output: number
}

class Game {
  private board: Board = new Board()
  private turn: Piece = Piece.X
  private players: Player[] = []
  private history: HistoryItem[] = []

  constructor(player1: Player, player2: Player) {
    this.players = [player1, player2]
    player1.piece = Piece.X
    player2.piece = Piece.Z
  }

  public play() {
    while (!this.board.hasWinner()) {
      const position: number = this.players[this.turn].getPosition(this.board)

      if (this.board.isPositionEmpty(position)) {
        this.history.push({ input: this.board.toArray(), position, turn: this.turn, output: 0.5 })
        this.board.fillPosition(position, this.turn)
      } else {
        this.board.log()
        throw new Error('Invalid position ' + position)
      }

      this.advanceTurn()
    }

    const winner = this.board.getWinner()!

    // this.board.log()
    console.log(Piece[winner])

    if (winner !== Piece.NONE)
      this.history.forEach(item => {
        item.output = item.turn === winner ? 1 : 0
      })
    // console.log(this.history)
  }

  public getHistory(): HistoryItem[] {
    return [...this.history]
  }

  private advanceTurn() {
    this.turn = (this.turn + 1) % 2
  }
}

export default Game
