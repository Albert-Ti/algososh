import React from 'react'
import { SolutionLayout } from '../ui/solution-layout/solution-layout'
import { Input } from '../ui/input/input'
import { Button } from '../ui/button/button'
import styles from './string.module.css'
import { Circle } from '../ui/circle/circle'

const swapPairs = (arr: string[], start = 0, end = arr.length - 1) => {
  if (start >= end) {
    return arr
  }
  ;[arr[start], arr[end]] = [arr[end], arr[start]]

  swapPairs(arr, (start += 1), (end -= 1))
  return arr
}

export const StringComponent: React.FC = () => {
  const [inputValue, setInputValue] = React.useState('')
  const [textArray, setTextArray] = React.useState<string[] | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleClick = () => {
    setTextArray(inputValue.split(''))

    if (textArray) {
      const newTextArray = [...textArray]

      console.log(swapPairs(newTextArray))

      setTimeout(() => {})
    }
  }

  return (
    <SolutionLayout title='Строка'>
      <div className={styles.content}>
        <div className={styles.wrapper}>
          <Input onChange={handleChange} value={inputValue} />
          <Button onClick={handleClick} text='Развернуть' />
        </div>
        <p className={styles.info}>Максимум — 11 символов</p>
      </div>
      <div className={styles.circles}>
        {textArray?.map((text, i) => (
          <Circle letter={text} key={i} />
        ))}
      </div>
    </SolutionLayout>
  )
}
