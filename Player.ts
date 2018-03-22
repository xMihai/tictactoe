import Board, { Piece } from './Board'

abstract class Player {
  private _piece: Piece = Piece.NONE
  public set piece(p: Piece) {
    if (this._piece === Piece.NONE) this._piece = p
  }
  public get piece(): Piece {
    return this._piece
  }
  public abstract getPosition(board: Board): number
}

export default Player
