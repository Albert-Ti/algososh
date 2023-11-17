interface IQueue<T> {
  enqueue: (item: T) => void
  dequeue: () => void
  peak: () => T | null
  clear: () => void
}

export class Queue<T> implements IQueue<T> {
  public container: (T | null)[] = []
  public head = 0
  public tail = 0
  private readonly size: number = 0
  private length: number = 0

  constructor(size: number) {
    this.size = size
    this.container = Array(size)
  }

  enqueue = (item: T) => {
    if (this.length > this.size) {
      throw new Error('Maximum length exceeded')
    }

    if (this.tail <= this.size - 1) {
      this.container[this.tail] = item
      this.tail++
      this.length++
    }
  }

  dequeue = () => {
    if (this.getLength() === 0) {
      throw new Error('No elements in the queue')
    }

    this.container[this.head] = null
    this.head++
    this.length--
  }

  peak = (): T | null => {
    if (this.getLength() === 0) {
      throw new Error('No elements in the queue')
    }
    return this.container[this.head % this.tail]
  }

  getLength = () => this.length

  clear = () => {
    this.container = Array(this.size)
    this.head = 0
    this.tail = 0
    this.length = 0
  }
}
