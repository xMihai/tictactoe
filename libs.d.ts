declare module 'prompt' {
  function start(): void
  function stop(): void
  function get(schema: any, cb: Function): void
}
