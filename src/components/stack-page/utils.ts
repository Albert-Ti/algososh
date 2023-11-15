interface IStack<T> {
  push: (item: T) => void
  pop: () => void
  peak: () => T | null
  getSize: () => number
}

class Stack<T> implements IStack<T> {
  public container: T[] = []

  push = (item: T): void => {
    if (item) {
      this.container = [...this.container, item]
    }
  }
  pop = (): void => {
    this.container.pop()
  }
  peak = (): T | null => {
    return this.container[this.getSize() - 1]
  }
  getSize = () => this.container.length
}

export const stack = new Stack<string>()
