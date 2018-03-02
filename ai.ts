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
  const odds = base.activate(table)
  // console.log(odds)
  const best = odds.reduce(
    (result, probability, position) =>
      table[position] === 0.5 && probability > result.probability ? { position, probability } : result,
    { position: 0, probability: 0 }
  )

  trainingSet.push({ input: table.slice(0), output: odds, position: best.position })
  return best.position
}

export const train = (outcome: number) => {
  const localSet = trainingSet.map(item => ({
    ...item,
    output: item.output.map((probability, i) => {
      if (i === item.position)
        if (outcome === 0.5) return 0.8
        else if (outcome === item.input[9]) return 1
        else return 0
      else if (item.input[i] !== 0.5) return 0
      else return probability
    }),
  }))

  // console.log(outcome, localSet)

  localSet.forEach(item => {
    base.activate(item.input)
    base.propagate(0.001, item.output)
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
