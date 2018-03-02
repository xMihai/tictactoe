import * as ai from './ai'

interface Player {
  getPosition: (table: number[]) => number
  train: (outcome: number) => void
}

export default async function runner() {
  let table: number[] = new Array(10).fill(0.5)
  const iterator: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  // log(table)

  let turnSwitch = Math.round(Math.random())
  let draws = 0

  while (draws < 200000) {
    table = new Array(10).fill(0.5)
    turnSwitch = (turnSwitch + 1) % 2

    try {
      for (const i of iterator) {
        const piece = (i + turnSwitch) % 2
        table[9] = piece
        const position: number = ai.getPosition(table)

        if (table[position] === 0.5) table[position] = piece
        else throw new Error('invalid move')

        // log(table)

        if (isWon(table)) {
          // console.log('winner is ' + piece)
          ai.train(piece)
          if (draws > 100) console.log(draws, 'draws')
          draws = 0
          throw new Error('won')
        }
      }
      // console.log('draw')
      ai.train(0.5)
      draws++
    } catch (e) {
      if (e.message !== 'won') throw e
    }
  }

  console.log(draws, 'draws')
  ai.save()
}

const log = (table: number[]): void => {
  console.log(table[0].toFixed(1), table[1].toFixed(1), table[2].toFixed(1))
  console.log(table[3].toFixed(1), table[4].toFixed(1), table[5].toFixed(1))
  console.log(table[6].toFixed(1), table[7].toFixed(1), table[8].toFixed(1))
  console.log(' ')
}

const isWon = (table: number[]): boolean => {
  const sets = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]

  return sets.some(set => set.every(p => table[p] === 0) || set.every(p => table[p] === 1))
}
