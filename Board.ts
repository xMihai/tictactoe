export enum Piece {
  X = 0,
  Z = 1,
  NONE = 0.5,
}

class Board {
  /** Is the given board valid? */
  public static isValid(board: number[]): boolean {
    return board.length === 9 && board.every(piece => [0, 1, 0.5].includes(piece))
  }

  /** Get the winner */
  public static getWinner(board: number[]): Piece | null {
    const sets = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]

    if (sets.some(set => set.every(p => board[p] === Piece.X))) return Piece.X
    else if (sets.some(set => set.every(p => board[p] === Piece.Z))) return Piece.Z
    else if (board.every(piece => piece !== Piece.NONE)) return Piece.NONE
    else return null
  }

  /** Does it have a winner yet? */
  public static hasWinner(board: number[]): boolean {
    return Board.getWinner(board) !== null
  }

  /** Get a list of empty positions */
  public static getEmptyPositions(board: number[]): number[] {
    return board.map((piece, i) => (piece === Piece.NONE ? i : null)).filter(x => x !== null) as number[]
  }

  /** The board */
  private readonly _board: number[] = new Array(9).fill(Piece.NONE)

  constructor(externalBoard?: number[]) {
    if (!!externalBoard && Board.isValid(externalBoard)) {
      this._board.length = 0
      externalBoard.forEach(piece => this._board.push(piece))
    }
  }

  /** Get a clone of the board */
  public toArray(): number[] {
    return [...this._board]
  }

  /** Fill a position with a piece */
  public fillPosition(position: number, piece: Piece): void {
    if (this._board[position] === Piece.NONE) this._board[position] = piece
  }

  /** Get the winner */
  public getWinner(): Piece | null {
    return Board.getWinner(this._board)
  }

  /** Does it have a winner yet? */
  public hasWinner(): boolean {
    return Board.hasWinner(this._board)
  }

  /** Is this position empty? */
  public isPositionEmpty(position: number): boolean {
    return this._board[position] === Piece.NONE
  }

  public getEmptyPositions(): number[] {
    return Board.getEmptyPositions(this._board)
  }

  public log(): void {
    const getSign = (piece: Piece) => (piece === Piece.NONE ? '-' : Piece[piece])

    console.log(getSign(this._board[0]), getSign(this._board[1]), getSign(this._board[2]))
    console.log(getSign(this._board[3]), getSign(this._board[4]), getSign(this._board[5]))
    console.log(getSign(this._board[6]), getSign(this._board[7]), getSign(this._board[8]))
    console.log(' ')
  }
}

export default Board
