import Game from './Game'
import { Trainer, Architect, Neuron } from 'synaptic'

import RandomPlayer from './RandomPlayer'
import MinimaxPlayer from './MinimaxPlayer'

const history: ObjectMap<number[][]> = {}

const parseHistory = (game: Game) => {
  game.getHistory().forEach(item => {
    const key = item.input.join('|')
    history[key] = history[key] || [[], [], [], [], [], [], [], [], []]
    history[key][item.position].push(item.output)
  })
}

const loop = 50

for (let i = 0; i < loop; i++) {
  const game = new Game(new MinimaxPlayer(), new RandomPlayer())
  game.play()
  parseHistory(game)
}

console.log(' ')

for (let i = 0; i < loop; i++) {
  const game = new Game(new RandomPlayer(), new MinimaxPlayer())
  game.play()
  parseHistory(game)
}

console.log(' ')

for (let i = 0; i < loop; i++) {
  const game = new Game(new MinimaxPlayer(), new MinimaxPlayer())
  game.play()
  parseHistory(game)
}

const trainingSet: Trainer.TrainingSet = Object.keys(history).reduce(
  (result: Trainer.TrainingSet, key): Trainer.TrainingSet => [
    ...result,
    {
      input: [...new Array(9).fill(0), ...key.split('|').map(s => parseFloat(s)), ...new Array(9).fill(1)],
      output: history[key].map(
        results => (results.length === 0 ? 0.5 : results.reduce((r, x) => r + x, 0) / results.length)
      ),
    },
  ],
  []
)
// console.log(history)
// console.log(trainingSet)

const network = new Architect.Perceptron(9 * 3, 9 * 3, 9, 9)
// const layers = [network.layers.input, ...network.layers.hidden, network.layers.output]
// layers.forEach(layer => {
//   layer.set({ squash: Neuron.squash.RELU })
// })

const trainer = new Trainer(network)

console.log(network.activate(trainingSet[0].input).map(x => x.toPrecision(2)))
console.log(trainingSet[0].output.map(x => x.toPrecision(2)))
console.log(' ')
console.log(network.activate(trainingSet[10].input).map(x => x.toPrecision(2)))
console.log(trainingSet[10].output.map(x => x.toPrecision(2)))
console.log(' ')

console.log('trainingSet.length', trainingSet.length)

trainer.train(trainingSet, {
  rate: 0.05,
  iterations: 1000,
  error: 0.0005,
  shuffle: false,
  log: 100,
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

console.log(network.activate(trainingSet[0].input).map(x => x.toPrecision(2)))
console.log(trainingSet[0].output.map(x => x.toPrecision(2)))
console.log(' ')
console.log(network.activate(trainingSet[10].input).map(x => x.toPrecision(2)))
console.log(trainingSet[10].output.map(x => x.toPrecision(2)))
console.log(' ')
