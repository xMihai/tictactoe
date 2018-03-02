import * as ai from './ai'
import * as human from './human'

export default async function runner() {
  const table: number[] = new Array(9).fill(0.5)
  const iterator: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  log(table)

  for (const i of iterator) {
    const piece = i % 2
    const move: number = ai.getMove(table)
    if (table[move] === 0.5) table[move] = piece
    else throw new Error('invalid move')
    if (isDone(table)) throw new Error('winner is ' + piece)
    log(table)
  }

  console.log('draw')
}

const log = (table: number[]): void => {
  console.log(table[0].toFixed(1), table[1].toFixed(1), table[2].toFixed(1))
  console.log(table[3].toFixed(1), table[4].toFixed(1), table[5].toFixed(1))
  console.log(table[6].toFixed(1), table[7].toFixed(1), table[8].toFixed(1))
}

const isDone = (table: number[]): boolean => {
  const sets = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  return sets.some(
    set => set.every(p => table[p] === 0) || set.every(p => table[p] === 1)
  )
}
