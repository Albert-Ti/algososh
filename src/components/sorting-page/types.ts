import { Direction } from '../../types/direction'
import { ElementStates } from '../../types/element-states'

export type TData = {
  items: TColumn[]
  load: boolean
}

export type TFilter = {
  sort: Direction | ''
  algorithm: 'bubble-sort' | 'selection-sort' | string
}

export type TColumn = {
  id: number
  column: number
  status: ElementStates
}

export type TAlgorithmStarted = {
  algorithm: 'bubble-sort' | 'selection-sort' | string
  start: boolean
  click: Direction | ''
}
