import { Architect } from 'synaptic'

const base = new Architect.Perceptron(9, 9, 5)
const o1 = new Architect.Perceptron(5, 9, 1)

console.log(base.activate([0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5]))
const aa = base.project(o1)
aa.
console.log(base.activate([0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5]))
console.log(
  o1.activate(base.activate([0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5]))
)

o1.propagate(0.1, [1])
console.log(base.activate([0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5]))
console.log(
  o1.activate(base.activate([0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5]))
)

export const getMove = (table: number[]): number => {
  return 0
}
