export enum Piece {
  X = 0,
  Z = 1,
}

class Table {
  public static readonly NONE: number = 0.5
  public static readonly X: number = 0
  public static readonly Z: number = 1

  private readonly table: number[] = new Array(9).fill(Table.NONE)

  public toArray(): number[] {
    return [...this.table]
  }

  public fill(position: number, piece: Piece): void {
    if (this.table[position] === Table.NONE) this.table[position] = piece
  }

  public getWinner(): number {
    const sets = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]

    if (sets.some(set => set.every(p => this.table[p] === Table.X))) return Table.X
    else if (sets.some(set => set.every(p => this.table[p] === Table.Z))) return Table.Z
    else return Table.NONE
  }

  public hasWinner(): boolean {
    return this.getWinner() !== Table.NONE
  }

  public isEmpty(position: number): boolean {
    return this.table[position] === Table.NONE
  }
}

export default Table
