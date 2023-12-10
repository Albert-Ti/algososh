import { Direction } from '../../types/direction'
import { ElementStates } from '../../types/element-states'
import { swap, timeout } from '../../utils'
import { TAlgorithmStarted, TColumn } from './types'

export const selectionSort = async (
  array: TColumn[],
  setCreateArray: (arr: TColumn[]) => void,
  algorithmStarted: TAlgorithmStarted,
  setAlgorithmStarted: (obj: TAlgorithmStarted) => void
) => {
  if (algorithmStarted.click === Direction.Ascending) {
    for (let i = 0; i < array.length - 1; i++) {
      let indexMin = i

      for (let j = i + 1; j < array.length; j++) {
        array[i].status = ElementStates.Changing
        array[j].status = ElementStates.Changing
        setCreateArray([...array])
        await timeout(500)

        if (array[j].column < array[indexMin].column) {
          indexMin = j
        }
        array[j].status = ElementStates.Default
        setCreateArray([...array])
      }
      swap<TColumn>(array, i, indexMin)
      array[i].status = ElementStates.Modified
    }
    array[array.length - 1].status = ElementStates.Modified
  } else {
    for (let i = 0; i < array.length - 1; i++) {
      let indexMin = i

      for (let j = i + 1; j < array.length; j++) {
        array[i].status = ElementStates.Changing
        array[j].status = ElementStates.Changing
        setCreateArray([...array])

        await timeout(500)
        if (array[j].column > array[indexMin].column) {
          indexMin = j
        }
        array[j].status = ElementStates.Default
      }

      swap<TColumn>(array, i, indexMin)
      array[i].status = ElementStates.Modified
    }
    if (array.length) {
      array[array.length - 1].status = ElementStates.Modified
    }
  }
  setCreateArray(array)
  setAlgorithmStarted({ ...algorithmStarted, start: false, click: '' })
}

export const bubbleSort = async (
  array: TColumn[],
  setCreateArray: (arr: TColumn[]) => void,
  algorithmStarted: TAlgorithmStarted,
  setAlgorithmStarted: (obj: TAlgorithmStarted) => void
) => {
  if (algorithmStarted.click === Direction.Ascending && array.length) {
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length - i - 1; j++) {
        array[j].status = ElementStates.Changing
        array[j + 1].status = ElementStates.Changing

        if (array[j].column > array[j + 1].column) {
          swap<TColumn>(array, j, j + 1)
          await timeout(500)
          setCreateArray([...array])
        }
        array[j].status = ElementStates.Default
        array[j + 1].status = ElementStates.Default
      }
      array[array.length - 1 - i].status = ElementStates.Modified
      array[array.length - 1].status = ElementStates.Modified
    }
  } else {
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length - i - 1; j++) {
        array[j].status = ElementStates.Changing
        array[j + 1].status = ElementStates.Changing

        if (array[j].column < array[j + 1].column) {
          swap<TColumn>(array, j, j + 1)
          await timeout(500)
          setCreateArray([...array])
        }
        array[j].status = ElementStates.Default
        array[j + 1].status = ElementStates.Default
      }
      array[array.length - 1 - i].status = ElementStates.Modified
      array[array.length - 1].status = ElementStates.Modified
    }
  }
  setCreateArray(array)
  setAlgorithmStarted({ ...algorithmStarted, start: false, click: '' })
}

export const randomArray = () => {
  const array: TColumn[] = []
  for (let i = 0; i <= Math.floor(Math.random() * 14) + 3; i++) {
    array.push({
      id: crypto.randomUUID(),
      column: Math.round(Math.random() * 100),
      status: ElementStates.Default,
    })
  }
  return array
}
