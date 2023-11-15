import React from 'react'
import { SolutionLayout } from '../ui/solution-layout/solution-layout'
import { Input } from '../ui/input/input'
import { Button } from '../ui/button/button'
import styles from './stack-page.module.css'
import { Circle } from '../ui/circle/circle'
import { stack } from './utils'
import { ElementStates } from '../../types/element-states'
import { timeout } from '../../utils'

export const StackPage: React.FC = () => {
  const [inputValue, setInputValue] = React.useState('')
  const [createArray, setCreateArray] = React.useState<string[]>([])
  const [changeState, setChengeState] = React.useState<ElementStates>()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    stack.push(inputValue)
    setCreateArray([...stack.container])
    setChengeState(ElementStates.Changing)
    await timeout(500)
    setChengeState(ElementStates.Default)
    setInputValue('')
  }

  const removeItem = async () => {
    stack.pop()
    setCreateArray([...stack.container])
    setChengeState(ElementStates.Changing)
    await timeout(500)
    setChengeState(ElementStates.Default)
  }

  const clearItems = () => {
    setCreateArray([])
    stack.container = []
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
