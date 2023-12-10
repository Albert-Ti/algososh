import { timeout } from '../../global-utils'

export class Node<T> {
  value: T
  next: Node<T> | null
  constructor(value: T, next?: Node<T> | null) {
    this.value = value
    this.next = next === undefined ? null : next
  }
}

interface ILinkedList<T> {
  append: (element: T) => void
  preppend: (element: T) => void
  removeLast: () => void
  removeFirst: () => void
  insertByIndex: (element: T, index: number) => void
  removeByIndex: (index: number) => void
  getSize: () => number
  randomList: () => void
  toArray: () => Node<T>[]
}

class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null
  private size: number
  constructor() {
    this.head = null
    this.size = 0
  }

  append(element: T) {
    const node = new Node(element)
    let current

    if (this.head === null) {
      this.head = node
    } else {
      current = this.head
      while (current.next) {
        current = current.next
      }

      current.next = node
    }
    this.size++
  }

  preppend(element: T) {
    const node = new Node(element, this.head)

    this.head = node
    this.size++
  }

  removeLast() {
    if (!this.head) {
      console.log(
        'Связанный список пуст, невозможно удалить последний элемент.'
      )
      return
    }
    if (!this.head?.next) {
      this.head = null
    }
    let current = this.head
    let prev = null

    while (current?.next) {
      prev = current
      current = current.next
    }
    prev!.next = null
    this.size--
  }

  removeFirst() {
    if (!this.head) {
      console.log('Связанный список пуст, невозможно удалить первый элемент.')
      return
    }
    this.head = this.head.next
    this.size--
  }

  insertByIndex(element: T, index: number) {
    if (index < 0 || index > this.size) {
      console.log('Такого индекса не существует')
      return
    } else {
      const node = new Node(element)

      if (index === 0) {
        node.next = this.head
        this.head = node
      } else {
        let current = this.head
        let prev = null
        let currentIndex = 0

        while (currentIndex < index) {
          prev = current
          current = current!.next
          currentIndex++
        }
        node.next = current
        prev!.next = node
      }

      this.size++
    }
  }

  removeByIndex(index: number) {
    if (index < 0 || index >= this.size) {
      return
    }

    if (index === 0) {
      this.head = this.head!.next
    } else {
      let currIndex = 0
      let current = this.head
      let prev = null

      while (index > currIndex) {
        prev = current
        current = current!.next
        currIndex++
      }
      prev!.next = current!.next
    }
    this.size--
  }

  getSize() {
    return this.size
  }

  randomList() {
    if (this.head) return

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length)
      const randomChar: unknown = characters.charAt(randomIndex)
      this.append(randomChar as T)
    }
  }

  toArray() {
    const output = []
    let current = this.head

    while (current) {
      output.push(current)
      current = current.next
    }
    return output
  }
}

export const list = new LinkedList<string>()

export const counter = async (
  indexValue: number,
  setCount: React.Dispatch<React.SetStateAction<number>>
) => {
  let count = 0
  while (count < +indexValue) {
    await timeout(1000)
    count++
    setCount(prev => prev + 1)
  }
}
