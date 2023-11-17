import React from 'react'
import { ElementStates } from '../../types/element-states'
import { timeout } from '../../utils'
import { Button } from '../ui/button/button'
import { Circle } from '../ui/circle/circle'
import { Input } from '../ui/input/input'
import { SolutionLayout } from '../ui/solution-layout/solution-layout'
import styles from './stack-page.module.css'
import { stack } from './utils'

export const StackPage: React.FC = () => {
  const [inputValue, setInputValue] = React.useState('')
  const [createArray, setCreateArray] = React.useState<string[]>([])
  const [changeState, setChangeState] = React.useState<ElementStates>()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    stack.push(inputValue)
    setCreateArray([...stack.container])

    setChangeState(ElementStates.Changing)
    await timeout(500)
    setChangeState(ElementStates.Default)

    setInputValue('')
  }

  const removeItem = async () => {
    stack.pop()
    setCreateArray([...stack.container])
    setChangeState(ElementStates.Changing)
    await timeout(500)
    setChangeState(ElementStates.Default)
  }

  const clearItems = () => {
    stack.clear()
  }

  return (
    <SolutionLayout title='Стек'>
      <div className={styles.content}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            value={inputValue}
            isLimitText={true}
            maxLength={4}
            extraClass={styles.input}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInputValue(e.target.value)
            }
          />
          <Button disabled={!inputValue} type='submit' text='Добавить' />
          <Button
            disabled={stack.getSize() === 0}
            onClick={removeItem}
            text='Удалить'
          />
          <Button
            disabled={stack.getSize() === 0}
            onClick={clearItems}
            extraClass={styles.clear}
            text='Очистить'
          />
        </form>
        <div className={styles.circle}>
          {createArray.map((item, i) => (
            <Circle
              head={i === stack.getSize() - 1 ? 'Top' : ''}
              letter={item}
              index={i}
              key={i}
              state={
                i === stack.getSize() - 1 ? changeState : ElementStates.Default
              }
            />
          ))}
        </div>
      </div>
    </SolutionLayout>
  )
}
