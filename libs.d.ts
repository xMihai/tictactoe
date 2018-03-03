declare module 'prompt' {
  function start(): void
  function stop(): void
  function get(schema: any, cb: (err: any, result: { question: string }) => void): void
}

declare module '*.json' {
  const a: void
  export default a
}

interface ObjectMap<T> {
  [key: string]: T
}
