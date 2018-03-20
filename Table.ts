export enum Piece {
  X = 0,
  Z = 1,
  NONE = 0.5,
}

// Rename to Game
class Table {
  private readonly board: number[] = new Array(9).fill(Piece.NONE)

  constructor(externalBoard?: number[]) {
    if (!!externalBoard && this.isValid(externalBoard)) {
      this.board.length = 0
      externalBoard.forEach(piece => this.board.push(piece))
    }
  }

  /** Is the given board valid? */
  public isValid(board: number[] = this.board): boolean {
    return board.length === 9 && board.every(piece => [0, 1, 0.5].includes(piece))
  }

  /** Get a clone of the board array */
  public toArray(): number[] {
    return [...this.board]
  }

  /** Fill a position with a piece */
  public fill(position: number, piece: Piece): void {
    if (this.board[position] === Piece.NONE) this.board[position] = piece
  }

  /** Get the winner */
  public getWinner(): Piece {
    const sets = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]

    if (sets.some(set => set.every(p => this.board[p] === Piece.X))) return Piece.X
    else if (sets.some(set => set.every(p => this.board[p] === Piece.Z))) return Piece.Z
    else return Piece.NONE
  }

  /** Does it have a winner yet? */
  public hasWinner(): boolean {
    return this.getWinner() !== Piece.NONE
  }

  /** Is this position empty? */
  public isEmpty(position: number): boolean {
    return this.board[position] === Piece.NONE
  }

  /** Get a list of empty positions */
  public getEmptyPositions(): number[] {
    return this.board.map((piece, i) => (piece === Piece.NONE ? i : null)).filter(x => x !== null) as number[]
  }
}

export default Table
