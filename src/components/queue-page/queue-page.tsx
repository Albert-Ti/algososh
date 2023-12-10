import React from 'react'
import { useForm } from '../../hooks'
import { ElementStates } from '../../types/element-states'
import { timeout } from '../../global-utils'
import { Button } from '../ui/button/button'
import { Circle } from '../ui/circle/circle'
import { Input } from '../ui/input/input'
import { SolutionLayout } from '../ui/solution-layout/solution-layout'
import styles from './queue-page.module.css'
import { queue } from './utils'

export const QueuePage: React.FC = () => {
  const { values, setValues, handleChange } = useForm({ queue: '' })
  const [createArray, setCreateArray] = React.useState<
    (string | null)[] | null
  >([...queue.container])
  const [changeState, setChangeState] = React.useState({
    head: ElementStates.Default,
    tail: ElementStates.Default,
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    queue.enqueue(values.queue)
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
    setValues({ queue: '' })
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
            name='queue'
            extraClass={styles.input}
            value={values.queue}
            isLimitText={true}
            maxLength={4}
            onChange={handleChange}
          />
          <Button
            data-test='submit-button'
            disabled={!values.queue && queue.getLength() === queue.tail}
            type='submit'
            text='Добавить'
            isLoader={
              changeState.tail === ElementStates.Changing ? true : false
            }
          />
          <Button
            data-test='remove-button'
            disabled={queue.getLength() === 0}
            onClick={removeItem}
            text='Удалить'
            isLoader={
              changeState.head === ElementStates.Changing ? true : false
            }
          />
          <Button
            data-test='clear-button'
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
