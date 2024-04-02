import { SHORT_DELAY_IN_MS } from '../../src/constants/delays'
import { CIRCLE_SELECTOR } from '../support/constants'

describe('Fibonacci component tests', () => {
  beforeEach(() => {
    cy.visit('/fibonacci')
  })

  it('button disabled', () => {
    cy.get('button').should('be.disabled')
    cy.get('input').should('be.empty')
    cy.get('button').should('be.disabled')
  })

  it('Check that the numbers are generated correctly', () => {
    cy.get('input').type('8{enter}')
    cy.get(CIRCLE_SELECTOR).as('circleItem')

    cy.get('@circleItem').contains('1')
    cy.wait(SHORT_DELAY_IN_MS)
    cy.get('@circleItem').contains('2')
    cy.wait(SHORT_DELAY_IN_MS)
    cy.get('@circleItem').contains('3')
    cy.wait(SHORT_DELAY_IN_MS)
    cy.get('@circleItem').contains('5')
    cy.wait(SHORT_DELAY_IN_MS)
    cy.get('@circleItem').contains('8')
    cy.wait(SHORT_DELAY_IN_MS)
    cy.get('@circleItem').contains('13')
    cy.wait(SHORT_DELAY_IN_MS)
    cy.get('@circleItem').contains('21')
  })
})
