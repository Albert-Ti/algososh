import React from 'react'
import { Direction } from '../../types/direction'
import { ElementStates } from '../../types/element-states'
import { Button } from '../ui/button/button'
import { Column } from '../ui/column/column'
import { RadioInput } from '../ui/radio-input/radio-input'
import { SolutionLayout } from '../ui/solution-layout/solution-layout'
import { bubbleSort, selectionSort } from './utils'
import styles from './sorting-page.module.css'
import { TAlgorithmStarted, TColumn } from './types'

export const SortingPage: React.FC = () => {
  const [createArray, setCreateArray] = React.useState<TColumn[]>([])
  const [isMount, setIsmount] = React.useState(false)
  const [algorithmStarted, setAlgorithmStarted] =
    React.useState<TAlgorithmStarted>({
      algorithm: 'selection-sort',
      start: false,
      click: '',
    })

  const randomArray = () => {
    setAlgorithmStarted({
      algorithm: 'selection-sort',
      start: false,
      click: '',
    })
    const array: TColumn[] = []
    for (let i = 0; i <= Math.floor(Math.random() * 14) + 3; i++) {
      array.push({
        id: crypto.randomUUID(),
        column: Math.round(Math.random() * 100),
        status: ElementStates.Default,
      })
    }
    setCreateArray(array)
  }

  React.useEffect(() => {
    switch (algorithmStarted.algorithm) {
      case 'selection-sort':
        selectionSort(
          [...createArray],
          setCreateArray,
          algorithmStarted,
          setAlgorithmStarted
        )
        break
      case 'bubble-sort':
        bubbleSort(
          [...createArray],
          setCreateArray,
          algorithmStarted,
          setAlgorithmStarted
        )
        break
    }
    return () => setIsmount(false)
  }, [isMount])

  const handleClickButton = (sort: Direction) => {
    setAlgorithmStarted({ ...algorithmStarted, start: true, click: sort })
    setIsmount(true)
  }

  return (
    <SolutionLayout title='Сортировка массива'>
      <div className={styles.content}>
        <div className={styles.selection}>
          <RadioInput
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAlgorithmStarted({
                ...algorithmStarted,
                algorithm: e.target.value,
              })
            }
            label='Выбор'
            name='option'
            value='selection-sort'
            defaultChecked
          />
          <RadioInput
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAlgorithmStarted({
                ...algorithmStarted,
                algorithm: e.target.value,
              })
            }
            label='Пузырёк'
            name='option'
            value='bubble-sort'
          />
        </div>
        <div className={styles.sort}>
          <Button
            text='По возрастанию'
            extraClass={styles.button}
            onClick={() => handleClickButton(Direction.Ascending)}
            sorting={Direction.Ascending}
            disabled={algorithmStarted.click === Direction.Descending}
            isLoader={
              algorithmStarted.start &&
              algorithmStarted.click === Direction.Ascending
            }
          />
          <Button
            text='По убыванию'
            extraClass={styles.button}
            onClick={() => handleClickButton(Direction.Descending)}
            sorting={Direction.Descending}
            disabled={algorithmStarted.click === Direction.Ascending}
            isLoader={
              algorithmStarted.start &&
              algorithmStarted.click === Direction.Descending
            }
          />
        </div>
        <Button
          text='Новый массив'
          extraClass={styles.button}
          onClick={randomArray}
          disabled={algorithmStarted.start}
        />
      </div>
      <div className={styles.column}>
        {createArray.map(({ id, column, status }) => (
          <Column key={id} index={column} state={status} />
        ))}
      </div>
    </SolutionLayout>
  )
}
