import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { timeout } from '../../global-utils'
import { renderWithRouter } from '../../tests/helper/render-with-router'
import { StringComponent } from './string'
import { getValueDomElements } from './utils'

describe('Testing the line reversal algorithm', () => {
  it('with an even number of symbols', async () => {
    renderWithRouter(<StringComponent />)

    const value = 'ABCD'
    userEvent.type(screen.getByRole('textbox'), value)
    userEvent.click(screen.getByText('Развернуть'))

    const arrayValue = getValueDomElements(screen.getByTestId('circles'))
    expect(arrayValue).toEqual(value.split(''))

    await timeout(2100)

    const arrayValueSwap = getValueDomElements(screen.getByTestId('circles'))
    expect(arrayValueSwap).toEqual(value.split('').reverse())
  })

  it('with an odd number of symbols', async () => {
    renderWithRouter(<StringComponent />)
    const value = 'ABC'

    userEvent.type(screen.getByRole('textbox'), value)
    userEvent.click(screen.getByText('Развернуть'))

    const arrayValue = getValueDomElements(screen.getByTestId('circles'))
    expect(arrayValue).toEqual(value.split(''))

    await timeout(2100)

    const arrayValueSwap = getValueDomElements(screen.getByTestId('circles'))
    expect(arrayValueSwap).toEqual(value.split('').reverse())
  })

  it('with one symbol', async () => {
    renderWithRouter(<StringComponent />)
    const value = 'A'

    userEvent.type(screen.getByRole('textbox'), value)
    userEvent.click(screen.getByText('Развернуть'))

    const arrayValue = getValueDomElements(screen.getByTestId('circles'))
    expect(arrayValue).toEqual(value.split(''))

    await timeout(1100)

    const arrayValueSwap = getValueDomElements(screen.getByTestId('circles'))
    expect(arrayValueSwap).toEqual(value.split('').reverse())
  })

  it('empty line', async () => {
    renderWithRouter(<StringComponent />)
    const value = ''

    userEvent.type(screen.getByRole('textbox'), value)
    userEvent.click(screen.getByText('Развернуть'))

    const arrayValue = getValueDomElements(screen.getByTestId('circles'))
    expect(arrayValue).toEqual(value.split(''))

    await timeout(1100)

    const arrayValueSwap = getValueDomElements(screen.getByTestId('circles'))
    expect(arrayValueSwap).toEqual(value.split('').reverse())
  })
})
