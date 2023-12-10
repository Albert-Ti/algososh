import React from 'react'
import { useForm } from '../../hooks'
import { ElementStates } from '../../types/element-states'
import { timeout } from '../../utils'
import { Button } from '../ui/button/button'
import { Circle } from '../ui/circle/circle'
import { ArrowIcon } from '../ui/icons/arrow-icon'
import { Input } from '../ui/input/input'
import { SolutionLayout } from '../ui/solution-layout/solution-layout'
import styles from './list-page.module.css'
import { TIsAction } from './types'
import { counter, list, Node } from './utils'

export const ListPage: React.FC = () => {
  const { values, setValues, handleChange } = useForm({ list: '', index: '' })
  const [createArray, setCreateArray] = React.useState<Node<string>[]>([])
  const [isAction, setIsAction] = React.useState<TIsAction>({
    add: { head: false, tail: false },
    remove: { head: false, tail: false },
    state: { head: false, tail: false },
  })
  const [isActionOnIndex, setIsActionOnIndex] = React.useState({
    add: false,
    remove: false,
  })
  const [countForIndex, setCountForIndex] = React.useState(0)

  React.useEffect(() => {
    list.randomList()
    setCreateArray([...list.toArray()])
  }, [])

  const addByIndex = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsActionOnIndex({ ...isActionOnIndex, add: true })

    if (+values.index < createArray.length) {
      await counter(+values.index, setCountForIndex)
      await timeout(1000)
      list.insertByIndex(values.list, +values.index)
      setCreateArray([...list.toArray()])
    }

    setCountForIndex(0)
    setValues({ list: '', index: '' })
    setIsActionOnIndex({ ...isActionOnIndex, add: false })
  }

  const removeByIndex = async () => {
    setIsActionOnIndex({ ...isActionOnIndex, remove: true })

    if (+values.index < createArray.length) {
      await counter(+values.index, setCountForIndex)
      await timeout(1000)
      list.removeByIndex(+values.index)
      setCreateArray([...list.toArray()])
    }

    setCountForIndex(0)
    setValues({ list: '', index: '' })
    setIsActionOnIndex({ ...isActionOnIndex, remove: false })
  }

  const addToHead = async () => {
    list.preppend(values.list)

    setIsAction({ ...isAction, add: { head: true } })
    await timeout(1000)
    setIsAction({ ...isAction, add: { head: false } })
    setCreateArray([...list.toArray()])
    setIsAction({ ...isAction, state: { head: true } })
    await timeout(500)
    setCreateArray([...list.toArray()])
    setIsAction({ ...isAction, state: { head: false } })

    setValues({ list: '', index: '' })
  }

  const addToTail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    list.append(values.list)

    setIsAction({ ...isAction, add: { tail: true } })
    await timeout(1000)
    setIsAction({ ...isAction, add: { tail: false } })
    setCreateArray([...list.toArray()])
    setIsAction({ ...isAction, state: { tail: true } })
    await timeout(500)
    setCreateArray([...list.toArray()])
    setIsAction({ ...isAction, state: { tail: false } })

    setValues({ list: '', index: '' })
  }

  const deleteInHead = async () => {
    list.removeFirst()
    setIsAction({ ...isAction, remove: { head: true } })
    await timeout(1000)
    setIsAction({ ...isAction, remove: { head: false } })
    setCreateArray([...list.toArray()])
  }

  const deleteInTail = async () => {
    list.removeFirst()
    setIsAction({ ...isAction, remove: { tail: true } })
    await timeout(1000)
    setIsAction({ ...isAction, remove: { tail: false } })
    setCreateArray([...list.toArray()])
  }

  const addCircleHeadSmall = (index: number, value: string) => {
    if (index === 0) {
      return isAction.add.head || isAction.remove.head ? (
        <Circle
          state={ElementStates.Changing}
          letter={isAction.add.head ? values.list : value}
          isSmall={true}
        />
      ) : (
        'head'
      )
    }
    if (index === countForIndex) {
      return isActionOnIndex.add ? (
        <Circle
          state={ElementStates.Changing}
          letter={isActionOnIndex.add ? values.list : value}
          isSmall={true}
        />
      ) : (
        ''
      )
    }
    return ''
  }

  const addCircleTailSmall = (index: number, value: string) => {
    if (index === +values.index) {
      return isActionOnIndex.remove && countForIndex === +values.index ? (
        <Circle state={ElementStates.Changing} letter={value} isSmall={true} />
      ) : (
        ''
      )
    }
    if (index === createArray.length - 1) {
      return isAction.add.tail || isAction.remove.tail ? (
        <Circle
          state={ElementStates.Changing}
          letter={isAction.add.tail ? values.list : value}
          isSmall={true}
        />
      ) : (
        'tail'
      )
    }
    return ''
  }

  const changeCirclePropsState = (index: number) => {
    if (isAction.state.head && index === 0) {
      return ElementStates.Modified
    }
    if (isAction.state.tail && index === createArray.length - 1) {
      return ElementStates.Modified
    }
    if (isActionOnIndex.remove && index === countForIndex) {
      return ElementStates.Changing
    }
    if (isActionOnIndex.add && index === countForIndex - 1) {
      return ElementStates.Changing
    }
    return ElementStates.Default
  }

  const hideCirclePropsValue = (index: number, value: string) => {
    if (isAction.remove.head && index === 0) {
      return ''
    }
    if (isAction.remove.tail && index === createArray.length - 1) {
      return ''
    }
    if (
      isActionOnIndex.remove &&
      index === +values.index &&
      countForIndex === +values.index
    ) {
      return ''
    }
    return value
  }

  return (
    <SolutionLayout title='Связный список'>
      <div className={styles.content}>
        <form onSubmit={addToTail} className={styles.form}>
          <Input
            name='list'
            onChange={handleChange}
            value={values.list}
            isLimitText={true}
            maxLength={4}
            extraClass={styles.input}
          />
          <Button
            disabled={!values.list || values.index ? true : false}
            onClick={addToHead}
            text='Добавить в head'
            extraClass={styles.button}
            isLoader={isAction.add.head}
          />
          <Button
            disabled={!values.list || values.index ? true : false}
            type='submit'
            text='Добавить в tail'
            extraClass={styles.button}
            isLoader={isAction.add.tail}
          />
          <Button
            onClick={deleteInHead}
            text='Удалить из head'
            extraClass={styles.button}
            isLoader={isAction.remove.head}
            disabled={!createArray.length}
          />
          <Button
            onClick={deleteInTail}
            text='Удалить из tail'
            extraClass={styles.button}
            isLoader={isAction.remove.tail}
            disabled={!createArray.length}
          />
        </form>
        <form onSubmit={addByIndex} className={styles.form}>
          <Input
            name='index'
            value={values.index}
            onChange={handleChange}
            type='number'
            placeholder='Введите индекс'
            extraClass={styles.input}
          />
          <Button
            disabled={
              !values.list ||
              !values.index ||
              +values.index > createArray.length - 1
            }
            type='submit'
            text='Добавить по индексу'
            extraClass={styles.button}
            isLoader={isActionOnIndex.add}
          />
          <Button
            disabled={!values.index || +values.index > createArray.length - 1}
            onClick={removeByIndex}
            text='Удалить по индексу'
            extraClass={styles.button}
            isLoader={isActionOnIndex.remove}
          />
        </form>
      </div>
      <div className={styles.circle}>
        {createArray.map((item, i) => (
          <React.Fragment key={i}>
            <Circle
              index={isAction.add.tail || isAction.remove.tail ? undefined : i}
              head={addCircleHeadSmall(i, item.value)}
              tail={addCircleTailSmall(i, item.value)}
              letter={hideCirclePropsValue(i, item.value)}
              state={changeCirclePropsState(i)}
            />
            {item.next && <ArrowIcon />}
          </React.Fragment>
        ))}
      </div>
    </SolutionLayout>
  )
}
