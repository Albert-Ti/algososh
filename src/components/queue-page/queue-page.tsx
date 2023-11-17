import React from 'react'
import { ElementStates } from '../../types/element-states'
import { timeout } from '../../utils'
import { Button } from '../ui/button/button'
import { Circle } from '../ui/circle/circle'
import { Input } from '../ui/input/input'
import { SolutionLayout } from '../ui/solution-layout/solution-layout'
import styles from './queue-page.module.css'
import { Queue } from './utils'

const queue = new Queue<string>(7)

export const QueuePage: React.FC = () => {
  const [inputValue, setInputValue] = React.useState('')
  const [createArray, setCreateArray] = React.useState<
    (string | null)[] | null
  >([...queue.container])
  const [changeState, setChangeState] = React.useState({
    head: ElementStates.Default,
    tail: ElementStates.Default,
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    queue.enqueue(inputValue)
    setChangeState({
      ...changeState,
      tail: ElementStates.Changing,
    })
    await timeout(500)
    setCreateArray([...queue.container])
    setChangeState({
      ...changeState,
      tail: ElementStates.Default,
    })
    setInputValue('')
  }

  const removeItem = async () => {
    if (queue.getLength() === 1) {
      queue.clear()
      setCreateArray([...queue.container])
    } else {
      setChangeState({
        ...changeState,
        head: ElementStates.Changing,
      })
      await timeout(500)
      setChangeState({
        ...changeState,
        head: ElementStates.Default,
      })
      queue.dequeue()
      setCreateArray([...queue.container])
    }
  }

  const clearItems = () => {
    queue.clear()
    setCreateArray([...queue.container])
  }

  return (
    <SolutionLayout title='Очередь'>
      <div className={styles.content}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            extraClass={styles.input}
            value={inputValue}
            isLimitText={true}
            maxLength={4}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInputValue(e.target.value)
            }
          />
          <Button
            disabled={!inputValue && queue.getLength() === queue.tail}
            type='submit'
            text='Добавить'
          />
          <Button
            disabled={queue.getLength() === 0}
            onClick={removeItem}
            text='Удалить'
          />
          <Button
            disabled={queue.getLength() === 0}
            onClick={clearItems}
            extraClass={styles.clear}
            text='Очистить'
          />
        </form>
        <div className={styles.circle}>
          {createArray?.map((item, i) => (
            <Circle
              letter={item!}
              key={i}
              index={i}
              head={createArray[i] && queue.head === i ? 'head' : ''}
              tail={createArray[i] && queue.tail - 1 === i ? 'tail' : ''}
              state={
                i === queue.tail - 1
                  ? changeState.tail
                  : i === queue.head
                  ? changeState.head
                  : ElementStates.Default
              }
            />
          ))}
        </div>
      </div>
    </SolutionLayout>
  )
}
