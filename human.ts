import * as prompt from 'prompt'

export function getMove(table: number[]): Promise<number> {
  prompt.start()
  return new Promise((resolve, reject) => {
    prompt.get(
      {
        description: 'Cell',
        pattern: /^\d$/,
        message: 'Again',
        required: true,
      },
      (err: any, result: { question: string }) => {
        if (!!err) reject(err)
        else resolve(+result.question)
      }
    )
  })
}
