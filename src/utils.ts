export const timeout = async (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms))

export const swap = <T>(array: T[], firstIndex: number, lastIndex: number) => {
  ;[array[firstIndex], array[lastIndex]] = [array[lastIndex], array[firstIndex]]
}
