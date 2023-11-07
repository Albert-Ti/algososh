import React from 'react'
import { SolutionLayout } from '../ui/solution-layout/solution-layout'
import { Input } from '../ui/input/input'
import { Button } from '../ui/button/button'
import styles from './string.module.css'
import { Circle } from '../ui/circle/circle'
import { ElementStates } from '../../types/element-states'

export const StringComponent: React.FC = () => {
  const [inputValue, setInputValue] = React.useState('')
  const [createArray, setCreateArray] = React.useState<string[]>([])
  const [reverseArray, setReverseArray] = React.useState(createArray)
  const [done, setDone] = React.useState(true)

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleClickButton = () => {
    setCreateArray(inputValue.split(''))
    setReverseArray([])
    setDone(false)
  }

  React.useEffect(() => {
    setTimeout(() => {
      const newTextArray = [...createArray]
      swapElements(newTextArray)
    }, 1000)
  }, [createArray])

  const swapElements = (arr: string[], start = 0, end = arr.length - 1) => {
    if (start >= end) {
      setDone(true)
      return arr
    }
    ;[arr[start], arr[end]] = [arr[end], arr[start]]

    setReverseArray([...arr])
    setTimeout(() => swapElements(arr, start + 1, end - 1), 1000)
  }

  return (
    <SolutionLayout title='Строка'>
      <div className={styles.content}>
        <div className={styles.wrapper}>
          <Input onChange={handleChangeInput} value={inputValue} />
          <Button
            disabled={inputValue.length > 11}
            isLoader={!done}
            onClick={handleClickButton}
            text='Развернуть'
          />
        </div>
        <p className={styles.info}>Максимум — 11 символов</p>
      </div>
      <div className={styles.circles}>
        {reverseArray.length
          ? reverseArray.map((text, i) => (
              <Circle
                state={
                  reverseArray[i] !== createArray[i] || done
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
