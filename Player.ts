import Table from './Table'

class Player {
  private readonly network = new Architect.Perceptron(9, 9, 9)

  constructor() {
    const layers = [this.network.layers.input, ...this.network.layers.hidden, this.network.layers.output]
    layers.forEach(layer => {
      layer.set({ squash: Neuron.squash.RELU })
    })
  }

  public getPosition(table: Table) {
    const tableArray = table.toArray()
    const odds = this.network.activate(tableArray).map((x, i) => (tableArray[i] === 0.5 ? x : 0))

    const sum = odds.slice(0)
    sum.forEach((x, i) => {
      sum[i] = x * x + (i === 0 ? 0 : sum[i - 1])
    })
    const point = Math.random() * sum.slice(-1)[0]
    const best = sum.reduce((result: number | null, x, i): number | null => {
      return result === null && x > point ? i : result
    }, null) as number

    return best
  }
}
export default Player
