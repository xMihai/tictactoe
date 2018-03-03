import * as ai from './ai'
import * as human from './human'

interface Player {
  getPosition: (table: number[]) => number
  train: (outcome: number) => void
}

const drawValue = 0.5
export type Binary = 0 | 1
export type Outcome = 0 | 1 | 0.5

export default function trainer() {
  let table: number[] = new Array(10).fill(0.5)
  const iterator: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8]

  let draws = 0

  for (let b = 0; b < 1000; b++) {
    for (let a = 0; a < 1000; a++) {
      table = new Array(10).fill(0.5)

      try {
        for (const i of iterator) {
          const piece: Binary = (i % 2) as Binary
          table[9] = piece
          const position: number = ai.getPosition(table)

          if (table[position] === 0.5) table[position] = piece
          else throw new Error('invalid move')

          if (isWon(table)) {
            // console.log('winner is ' + piece)
            ai.setTraining(piece)
            // if (draws > Infinity) console.log(draws, 'draws')
            // draws = 0
            throw new Error('won')
          }
        }
        // console.log('draw')
        ai.setTraining(drawValue)
        draws++
      } catch (e) {
        if (e.message !== 'won') throw e
      }
    }

    console.log(draws, 'draws')
    draws = 0
    console.log('ai train')
    ai.train()
    ai.save()
  }
}

const getSign = (x: number) => (x === 0.5 ? '-' : x ? 'X' : 'O')
const log = (table: number[]): void => {
  console.log(getSign(table[0]), getSign(table[1]), getSign(table[2]))
  console.log(getSign(table[3]), getSign(table[4]), getSign(table[5]))
  console.log(getSign(table[6]), getSign(table[7]), getSign(table[8]))
  console.log(' ')
}

const isWon = (table: number[]): boolean => {
  const sets = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]

  return sets.some(set => set.every(p => table[p] === 0) || set.every(p => table[p] === 1))
}

trainer()
