import { render } from '@testing-library/react'
import { Circle } from './circle'
import { ElementStates } from '../../../types/element-states'

describe('Testing the Circle Component', () => {
  it('correct rendering of an element without a letter', () => {
    const { container } = render(<Circle />)
    expect(container).toMatchSnapshot()
  })

  it('correct rendering of an element with a letter', () => {
    const { container } = render(<Circle letter='ABC' />)
    expect(container).toMatchSnapshot()
  })

  it('correct rendering of an element with head', () => {
    const { container } = render(<Circle head='1' />)
    expect(container).toMatchSnapshot()
  })

  it('correct rendering of an element with a react element in the head', () => {
    const { container } = render(<Circle head={<Circle />} />)
    expect(container).toMatchSnapshot()
  })

  it('correct rendering of an element with tail', () => {
    const { container } = render(<Circle tail='1' />)
    expect(container).toMatchSnapshot()
  })

  it('correct rendering of an element with a react element in the tail', () => {
    const { container } = render(<Circle tail={<Circle />} />)
    expect(container).toMatchSnapshot()
  })

  it('correct rendering of an element with index', () => {
    const { container } = render(<Circle index={0} />)
    expect(container).toMatchSnapshot()
  })

  it('correct rendering of an element with the property: isMail=true', () => {
    const { container } = render(<Circle isSmall={true} />)
    expect(container).toMatchSnapshot()
  })

  it('correct rendering of the element in the default state', () => {
    const { container } = render(<Circle state={ElementStates.Default} />)
    expect(container).toMatchSnapshot()
  })

  it('correct rendering of the element in the changing state', () => {
    const { container } = render(<Circle state={ElementStates.Changing} />)
    expect(container).toMatchSnapshot()
  })

  it('correct rendering of the element in the modified state', () => {
    const { container } = render(<Circle state={ElementStates.Modified} />)
    expect(container).toMatchSnapshot()
  })
})
