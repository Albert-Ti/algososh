import React from 'react'
import { useForm } from '../../hooks'
import { ElementStates } from '../../types/element-states'
import { swap } from '../../utils'
import { Button } from '../ui/button/button'
import { Circle } from '../ui/circle/circle'
import { Input } from '../ui/input/input'
import { SolutionLayout } from '../ui/solution-layout/solution-layout'
import styles from './string.module.css'

export const StringComponent: React.FC = () => {
  const { values, handleChange } = useForm({ string: '' })

  const [createArray, setCreateArray] = React.useState<string[]>([])
  const [reverseArray, setReverseArray] = React.useState(createArray)
  const [isDone, setIsDone] = React.useState(true)

  const handleClickSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setCreateArray(values.string.split(''))
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

  const disabledButton = !values.string || values.string.length > 11

  return (
    <SolutionLayout title='Строка'>
      <div className={styles.content}>
        <form onSubmit={handleClickSubmit} className={styles.form}>
          <Input
            name='string'
            value={values.string}
            onChange={handleChange}
            isLimitText={true}
            maxLength={11}
          />
          <Button
            disabled={disabledButton}
            isLoader={!isDone}
            text='Развернуть'
            type='submit'
          />
        </form>
      </div>
      <div className={styles.circles}>
        {reverseArray.length
          ? reverseArray.map((text, i) => (
              <Circle
                state={
                  (createArray.length && reverseArray[i] !== createArray[i]) ||
                  isDone
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
