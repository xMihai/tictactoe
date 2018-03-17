import { Architect, Layer, Network, Trainer, Neuron } from 'synaptic'
import * as fs from 'fs'
import * as savedNetwork from './network.json'
import { Outcome } from './trainer'

const base = new Architect.Perceptron(10, 9 * 6, 9)
// const base = Network.fromJSON(savedNetwork)
const layers = [base.layers.input, ...base.layers.hidden, base.layers.output]
layers.forEach(layer => {
  layer.set({ squash: Neuron.squash.RELU })
})

const trainer = new Trainer(base)

interface ExtendedTrainingItem extends TrainingItem {
  position: number
}

interface TrainingItem {
  input: number[]
  output: number[]
}

let trainingRegister: ObjectMap<ExtendedTrainingItem[]> = {}
const tempTrainingSet: ExtendedTrainingItem[] = []

export const getPosition = (table: number[]): number => {
  const odds = base.activate(table).map((x, i) => (table[i] === 0.5 ? x : 0))
  const sum = odds.slice(0)
  sum.forEach((x, i) => {
    sum[i] = x * x + (i === 0 ? 0 : sum[i - 1])
  })
  const point = Math.random() * sum.slice(-1)[0]
  const best = sum.reduce((result: number | null, x, i): number | null => {
    return result === null && x > point ? i : result
  }, null) as number

  tempTrainingSet.push({ input: table.slice(0), output: odds, position: best })
  return best
}

const getRegisterKey = (item: ExtendedTrainingItem) =>
  item.input.reduce((result: string, n: number): string => result + n.toString(), '')

export const setTraining = (outcome: Outcome): void => {
  const localSet: ExtendedTrainingItem[] = tempTrainingSet.map(item => ({
    ...item,
    output: item.output.map((probability, i) => {
      if (i === item.position)
        if (outcome === 0.5) return 0.5
        else if (outcome === item.input[9]) return 1
        else return 0
      else return probability
    }),
  }))

  localSet.forEach(item => {
    const key = getRegisterKey(item)
    trainingRegister[key] = trainingRegister[key] || []
    trainingRegister[key].push(item)
  })

  // console.log(outcome, localSet)

  tempTrainingSet.length = 0
}

const runTraining = (trainingSet: TrainingItem[]): void => {
  console.log('trainingSet.length', trainingSet.length)

  trainer.train(trainingSet, {
    rate: 0.05,
    iterations: 10 * 1000,
    error: 0.005,
    shuffle: false,
    log: 1000,
    cost: Trainer.cost.MSE,
    // cost: (targetValues: number[], outputValues: number[]): number => {
    //   const newTV: number[] = targetValues.filter(v => [0, 0.5, 1].includes(v))
    //   const newOV: number[] = outputValues.filter((_, i) => [0, 0.5, 1].includes(targetValues[i]))

    //   if (newTV.length !== newOV.length) throw new Error('newTV.length !== newOV.length')

    //   // console.log(newTV, newOV)
    //   // console.log(Trainer.cost.MSE(newTV, newOV))
    //   return Trainer.cost.MSE(newTV, newOV)
    // },
  })
}

const logMaxError = (trainingSet: TrainingItem[]) => {
  let maxError = 0
  let maxItem: TrainingItem = trainingSet[0]
  trainingSet.forEach(item => {
    const err = Trainer.cost.MSE(item.output, base.activate(item.input))
    if (err > maxError) {
      maxError = err
      maxItem = item
    }
  })

  if (maxItem) {
    console.log(maxError)
    console.log(maxItem.input.map(x => x.toFixed(3)).join(' - '))
    console.log(
      base
        .activate(maxItem.input)
        .map(x => x.toFixed(3))
        .join(' - ')
    )
    console.log(maxItem.output.map(x => x.toFixed(3)).join(' - '))
  }
}

export const train = () => {
  const trainingSet: Trainer.TrainingSet = Object.keys(trainingRegister).map(key => {
    const itemCount = trainingRegister[key].length
    const output = trainingRegister[key]
      .reduce(
        (result: number[], item): number[] => item.output.map((x, i) => result[i] + x / itemCount),
        trainingRegister[key][0].output.map(_ => 0)
      )
      .map(x => Math.min(1, x))
    // console.log(trainingRegister[key][0].input.length, output.length)
    return { input: trainingRegister[key][0].input, output }
  })

  trainingRegister = {}

  runTraining(trainingSet)
  logMaxError(trainingSet)

  // runTraining(trainingSet.filter(item => Trainer.cost.MSE(item.output, base.activate(item.input)) > 0.005))
  // logMaxError(trainingSet)

  // runTraining(trainingSet)
  // logMaxError(trainingSet)

  trainingSet.length = 0
}

export const save = () => {
  fs.writeFileSync('./network.json', JSON.stringify(base.toJSON()))
}
