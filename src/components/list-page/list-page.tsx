import React from 'react'
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
  const [inputValue, setInputValue] = React.useState({ list: '', index: '' })
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

  const addByIndex = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsActionOnIndex({ ...isActionOnIndex, add: true })

    if (+inputValue.index < createArray.length) {
      await counter(+inputValue.index, setCountForIndex)
      await timeout(1000)
      list.insertByIndex(inputValue.list, +inputValue.index)
      setCreateArray([...list.toArray()])
    }

    setCountForIndex(0)
    setInputValue({ list: '', index: '' })
    setIsActionOnIndex({ ...isActionOnIndex, add: false })
  }

  const removeByIndex = async () => {
    setIsActionOnIndex({ ...isActionOnIndex, remove: true })

    if (+inputValue.index < createArray.length) {
      await counter(+inputValue.index, setCountForIndex)
      await timeout(1000)
      list.removeByIndex(+inputValue.index)
      setCreateArray([...list.toArray()])
    }

    setCountForIndex(0)
    setInputValue({ list: '', index: '' })
    setIsActionOnIndex({ ...isActionOnIndex, remove: false })
  }

  const addToHead = async () => {
    list.preppend(inputValue.list)

    setIsAction({ ...isAction, add: { head: true } })
    await timeout(1000)
    setIsAction({ ...isAction, add: { head: false } })
    setCreateArray([...list.toArray()])
    setIsAction({ ...isAction, state: { head: true } })
    await timeout(500)
    setCreateArray([...list.toArray()])
    setIsAction({ ...isAction, state: { head: false } })

    setInputValue({ list: '', index: '' })
  }

  const addToTail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    list.append(inputValue.list)

    setIsAction({ ...isAction, add: { tail: true } })
    await timeout(1000)
    setIsAction({ ...isAction, add: { tail: false } })
    setCreateArray([...list.toArray()])
    setIsAction({ ...isAction, state: { tail: true } })
    await timeout(500)
    setCreateArray([...list.toArray()])
    setIsAction({ ...isAction, state: { tail: false } })

    setInputValue({ list: '', index: '' })
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
          letter={isAction.add.head ? inputValue.list : value}
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
          letter={isActionOnIndex.add ? inputValue.list : value}
          isSmall={true}
        />
      ) : (
        ''
      )
    }
    return ''
  }

  const addCircleTailSmall = (index: number, value: string) => {
    if (index === +inputValue.index) {
      return isActionOnIndex.remove && countForIndex === +inputValue.index ? (
        <Circle state={ElementStates.Changing} letter={value} isSmall={true} />
      ) : (
        ''
      )
    }
    if (index === createArray.length - 1) {
      return isAction.add.tail || isAction.remove.tail ? (
        <Circle
          state={ElementStates.Changing}
          letter={isAction.add.tail ? inputValue.list : value}
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

  const hieCirclePropsValue = (index: number, value: string) => {
    if (isAction.remove.head && index === 0) {
      return ''
    }
    if (isAction.remove.tail && index === createArray.length - 1) {
      return ''
    }
    if (
      isActionOnIndex.remove &&
      index === +inputValue.index &&
      countForIndex === +inputValue.index
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInputValue({ ...inputValue, list: e.target.value })
            }
            value={inputValue.list}
            isLimitText={true}
            maxLength={4}
            extraClass={styles.input}
          />
          <Button
            disabled={!inputValue.list || inputValue.index ? true : false}
            onClick={addToHead}
            text='Добавить в head'
            extraClass={styles.button}
            isLoader={isAction.add.head}
          />
          <Button
            disabled={!inputValue.list || inputValue.index ? true : false}
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
            value={inputValue.index}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInputValue({ ...inputValue, index: e.target.value })
            }
            type='number'
            placeholder='Введите индекс'
            extraClass={styles.input}
          />
          <Button
            disabled={!inputValue.list || !inputValue.index}
            type='submit'
            text='Добавить по индексу'
            extraClass={styles.button}
            isLoader={isActionOnIndex.add}
          />
          <Button
            disabled={!inputValue.index}
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
              letter={hieCirclePropsValue(i, item.value)}
              state={changeCirclePropsState(i)}
            />
            {item.next && <ArrowIcon />}
          </React.Fragment>
        ))}
      </div>
    </SolutionLayout>
  )
}
