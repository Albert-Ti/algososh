import React from 'react'
import { ElementStates } from '../../types/element-states'
import { timeout } from '../../utils'
import { Button } from '../ui/button/button'
import { Circle } from '../ui/circle/circle'
import { Input } from '../ui/input/input'
import { SolutionLayout } from '../ui/solution-layout/solution-layout'
import styles from './stack-page.module.css'
import { stack } from './utils'
import { useForm } from '../../hooks'

export const StackPage: React.FC = () => {
  const { values, setValues, handleChange } = useForm({ stack: '' })
  const [createArray, setCreateArray] = React.useState<string[]>([])
  const [changeState, setChangeState] = React.useState<ElementStates>()
  const [loaderButton, setLoaderButton] = React.useState({
    add: false,
    remove: false,
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoaderButton({ add: true, remove: false })
    stack.push(values.stack)
    setCreateArray([...stack.container])

    setChangeState(ElementStates.Changing)
    await timeout(500)
    setChangeState(ElementStates.Default)
    setLoaderButton({ add: false, remove: false })

    setValues({ stack: '' })
  }

  const removeItem = async () => {
    setLoaderButton({ add: false, remove: true })
    stack.pop()
    setCreateArray([...stack.container])
    setChangeState(ElementStates.Changing)
    await timeout(500)
    setChangeState(ElementStates.Default)
    setLoaderButton({ add: false, remove: false })
  }

  const clearItems = () => {
    stack.clear()
    setCreateArray([])
  }

  return (
    <SolutionLayout title='Стек'>
      <div className={styles.content}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            name='stack'
            value={values.stack}
            isLimitText={true}
            maxLength={4}
            extraClass={styles.input}
            onChange={handleChange}
          />

          <Button
            disabled={!values.stack}
            type='submit'
            text='Добавить'
            isLoader={loaderButton.add}
          />
          <Button
            disabled={stack.getSize() === 0}
            onClick={removeItem}
            text='Удалить'
            isLoader={loaderButton.remove}
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
