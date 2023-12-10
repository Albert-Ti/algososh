import { fireEvent, render, screen } from '@testing-library/react'
import { Button } from './button'

describe('Testing the Button component', () => {
  it('Button wit text', () => {
    render(<Button text='Send' />)
    expect(screen.getByRole('button')).toMatchSnapshot()
  })

  it('Button without text', () => {
    render(<Button />)
    expect(screen.getByRole('button')).toMatchSnapshot()
  })

  it('Locked button', () => {
    render(<Button disabled={true} />)
    expect(screen.getByRole('button')).toMatchSnapshot()
  })

  it('button with loading indication', () => {
    render(<Button isLoader={true} />)
    expect(screen.getByRole('button')).toMatchSnapshot()
  })

  it('correct callback call', () => {
    const onClickFake = jest.fn()
    render(<Button onClick={onClickFake} />)

    fireEvent.click(screen.getByRole('button'))
    expect(onClickFake).toHaveBeenCalledTimes(1)
  })
})
