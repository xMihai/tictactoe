import { Architect, Layer, Network } from 'synaptic'
import * as fs from 'fs'
import * as savedNetwork from './network.json'

const base = new Architect.Perceptron(10, 18, 9)
// const base = Network.fromJSON(savedNetwork)

interface TrainingItem {
  input: number[]
  output: number[]
  position: number
}

const trainingSet: TrainingItem[] = []

export const getPosition = (table: number[]): number => {
  const odds = base.activate(table).map((x, i) => (table[i] === 0.5 ? x : 0))
  const sum = odds.slice(0)
  sum.forEach((x, i) => {
    sum[i] = i === 0 ? x : sum[i - 1] + x
  })
  const point = Math.random() * sum.slice(-1)[0]
  const best = sum.reduce((result: number | null, x, i): number | null => {
    return result === null && x > point ? i : result
  }, null) as number

  trainingSet.push({ input: table.slice(0), output: odds, position: best })
  return best
}

export const train = (outcome: number) => {
  const localSet = trainingSet.map(item => ({
    ...item,
    output: item.output.map((probability, i) => {
      if (i === item.position)
        if (outcome === 0.5) return 0.5
        else if (outcome === item.input[9]) return 1
        else return 0
      else return probability
    }),
  }))

  // console.log(outcome, localSet)

  localSet.forEach(item => {
    base.activate(item.input)
    base.propagate(0.01, item.output)
  })

  // process.exit()

  trainingSet.length = 0
}

export const save = () => {
  fs.writeFile('./network.json', JSON.stringify(base.toJSON()), (err: Error) => {
    if (err) return console.log(err)
    console.log('The file was saved!')
  })
}
