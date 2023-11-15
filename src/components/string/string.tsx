import React from 'react'
import { ElementStates } from '../../types/element-states'
import { Circle } from '../ui/circle/circle'
import Form from '../ui/form/form'
import { SolutionLayout } from '../ui/solution-layout/solution-layout'
import styles from './string.module.css'
import { swap } from '../../utils'

export const StringComponent: React.FC = () => {
  const [inputValue, setInputValue] = React.useState('')
  const [createArray, setCreateArray] = React.useState<string[]>([])
  const [reverseArray, setReverseArray] = React.useState(createArray)
  const [isDone, setIsDone] = React.useState(true)

  const handleClickSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setCreateArray(inputValue.split(''))
    setReverseArray([])
    setIsDone(false)
  }

  React.useEffect(() => {
    setTimeout(() => {
      const newTextArray = [...createArray]
      swapItem(newTextArray)
    }, 1000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createArray])

  const swapItem = (arr: string[], start = 0, end = arr.length - 1) => {
    if (start >= end) {
      setIsDone(true)
      return arr
    }
    swap<string>(arr, start, end)
    setReverseArray([...arr])
    setTimeout(() => swapItem(arr, start + 1, end - 1), 1000)
  }

  const disabledButton = !inputValue || inputValue.length > 11

  return (
    <SolutionLayout title='Строка'>
      <div className={styles.content}>
        <Form
          onSubmit={handleClickSubmit}
          onChange={setInputValue}
          inputValue={inputValue}
          loaderButton={isDone}
          typeInput='text'
          disabled={disabledButton}
          textButton='Развернуть'
        />
        <p className={styles.info}>Максимум — 11 символов</p>
      </div>
      <div className={styles.circles}>
        {reverseArray.length
          ? reverseArray.map((text, i) => (
              <Circle
                state={
                  reverseArray[i] !== createArray[i] || isDone
                    ? ElementStates.Modified
                    : reverseArray[i - 1] === createArray[i - 1] &&
                      reverseArray[i + 1] === createArray[i + 1]
                    ? ElementStates.Default
                    : ElementStates.Changing
                }
                letter={text}
                key={i}
              />
            ))
          : createArray.map((text, i) => <Circle letter={text} key={i} />)}
      </div>
    </SolutionLayout>
  )
}
