import { SHORT_DELAY_IN_MS } from '../../constants/delays'
import { timeout } from '../../global-utils'
import { ElementStates } from '../../types/element-states'
import { TColumn } from './types'
import { bubbleSort, selectionSort } from './utils'

const newArray = [
  {
    id: 0,
    column: 40,
    status: ElementStates.Default,
  },
  {
    id: 1,
    column: 10,
    status: ElementStates.Default,
  },
  {
    id: 2,
    column: 90,
    status: ElementStates.Default,
  },
]

describe('Testing bubble sort algorithms', () => {
  it('empty array', async () => {
    let array: TColumn[] = []

    const getArray = (a: TColumn[]) => {
      array = a
    }

    bubbleSort(array, getArray, {
      algorithm: 'bubble-sort',
      start: false,
      click: '',
    })

    await timeout(0)
    expect(array).toEqual([])
  })

  it('an array of one element', async () => {
    let array: TColumn[] = []

    const getArray = (a: TColumn[]) => {
      array = [...a]
    }

    bubbleSort([newArray[0]], getArray, {
      algorithm: 'bubble-sort',
      start: false,
      click: '',
    })

    await timeout(0)
    expect(array).toEqual([newArray[0]])
  })

  it('array of multiple elements', async () => {
    let array: TColumn[] = []

    const getArray = (a: TColumn[]) => {
      array = [...a]
    }

    bubbleSort(newArray, getArray, {
      algorithm: 'bubble-sort',
      start: false,
      click: '',
    })

    await timeout(newArray.length * SHORT_DELAY_IN_MS)
    expect(array.length === newArray.length).toBe(true)
  })
})

describe('Testing selection sort algorithms', () => {
  it('empty array', async () => {
    let array: TColumn[] = []

    const getArray = (a: TColumn[]) => {
      array = a
    }

    selectionSort(array, getArray, {
      algorithm: 'selection-sort',
      start: false,
      click: '',
    })

    await timeout(0)
    expect(array).toEqual([])
  })

  it('an array of one element', async () => {
    let array: TColumn[] = []

    const getArray = (a: TColumn[]) => {
      array = [...a]
    }

    selectionSort([newArray[0]], getArray, {
      algorithm: 'selection-sort',
      start: false,
      click: '',
    })

    await timeout(0)
    expect(array).toEqual([newArray[0]])
  })

  it('array of multiple elements', async () => {
    let array: TColumn[] = []

    const getArray = (a: TColumn[]) => {
      array = [...a]
    }

    selectionSort(newArray, getArray, {
      algorithm: 'selection-sort',
      start: false,
      click: '',
    })

    await timeout(newArray.length * SHORT_DELAY_IN_MS)
    expect(array.length === newArray.length).toBe(true)
  })
})
