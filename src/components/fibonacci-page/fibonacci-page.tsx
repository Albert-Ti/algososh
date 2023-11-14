import React from 'react'
import { SolutionLayout } from '../ui/solution-layout/solution-layout'
import Form from '../ui/form/form'
import styles from './fibonacci-page.module.css'
import { Circle } from '../ui/circle/circle'

export const FibonacciPage: React.FC = () => {
  const [inputValue, setInputValue] = React.useState('')
  const [resultArray, setResultArray] = React.useState<number[]>([])
  const [isDone, setIsDone] = React.useState(true)

  const handleClickSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsDone(false)
    fibonacci(+inputValue)
  }

  const fibonacci = (n: number) => {
    let arr: number[] = [0, 1]
    let index = 0
    const resultFibonacci = (i: number) => {
      if (i < n - 1) {
        setTimeout(() => {
          arr.push(arr[i] + arr[i + 1])
          resultFibonacci(i + 1)
        }, 500)
      } else {
        setIsDone(true)
      }
      setResultArray([...arr.slice(1)])
    }
    resultFibonacci(index)
  }

  const disabledButton = +inputValue > 19 || +inputValue <= 0
  return (
    <SolutionLayout title='Последовательность Фибоначчи'>
      <div className={styles.form}>
        <Form
          onSubmit={handleClickSubmit}
          onChange={setInputValue}
          typeInput='number'
          inputValue={inputValue}
          disabled={disabledButton}
          loaderButton={isDone}
          textButton='Рассчитать'
        />
        <p className={styles.info}>Максимальное число — 19</p>
      </div>
      <div className={styles.circles}>
        {resultArray.map((num, i) => (
          <Circle letter={String(num)} index={i} key={i} />
        ))}
      </div>
    </SolutionLayout>
  )
}
