import React from 'react'
import { useForm } from '../../hooks'
import { Button } from '../ui/button/button'
import { Circle } from '../ui/circle/circle'
import { Input } from '../ui/input/input'
import { SolutionLayout } from '../ui/solution-layout/solution-layout'
import styles from './fibonacci-page.module.css'
import { SHORT_DELAY_IN_MS } from '../../constants/delays'

export const FibonacciPage: React.FC = () => {
  const { values, handleChange } = useForm({ fib: '' })

  const [resultArray, setResultArray] = React.useState<number[]>([])
  const [isDone, setIsDone] = React.useState(true)

  const handleClickSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsDone(false)
    fibonacci(+values.fib)
  }

  const fibonacci = (n: number) => {
    let arr: number[] = [0, 1]
    let index = 0
    const resultFibonacci = (i: number) => {
      if (i < n - 1) {
        setTimeout(() => {
          arr.push(arr[i] + arr[i + 1])
          resultFibonacci(i + 1)
        }, SHORT_DELAY_IN_MS)
      } else {
        setIsDone(true)
      }
      setResultArray([...arr.slice(1)])
    }
    resultFibonacci(index)
  }

  const disabledButton = +values.fib > 19 || +values.fib <= 0
  return (
    <SolutionLayout title='Последовательность Фибоначчи'>
      <div className={styles.content}>
        <form onSubmit={handleClickSubmit} className={styles.form}>
          <Input
            name='fib'
            value={values.fib}
            onChange={handleChange}
            isLimitText={true}
            max={19}
            type='number'
          />
          <Button
            disabled={disabledButton}
            isLoader={!isDone}
            text='Рассчитать'
            type='submit'
          />
        </form>
      </div>
      <div className={styles.circles}>
        {resultArray.map((num, i) => (
          <Circle letter={String(num)} index={i} key={i} />
        ))}
      </div>
    </SolutionLayout>
  )
}
