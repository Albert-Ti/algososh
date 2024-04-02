import { SHORT_DELAY_IN_MS } from '../../src/constants/delays'
import {
  CHANGING_COLOR,
  CIRCLE_SELECTOR,
  DEFAULT_COLOR,
} from '../support/constants'

describe('Stack component tests', () => {
  beforeEach(() => {
    cy.visit('/stack')
  })

  it('button disabled', () => {
    cy.get('input').should('be.empty')
    cy.getByData('submit-button').should('be.disabled')
    cy.getByData('remove-button').should('be.disabled')
    cy.getByData('clear-button').should('be.disabled')
  })

  it('Adding an element to the stack', () => {
    //add first-element
    cy.get('input').type('a1{enter}')

    cy.get(CIRCLE_SELECTOR).as('circleItem')

    cy.get('@circleItem').eq(0).contains('Top')
    cy.get('@circleItem')
      .contains('a1')
      .parent()
      .should('have.css', 'border-color', CHANGING_COLOR)

    cy.wait(SHORT_DELAY_IN_MS)

    cy.get('@circleItem')
      .contains('a1')
      .parent()
      .should('have.css', 'border-color', DEFAULT_COLOR)

    //add second-element
    cy.get('input').type('b2{enter}')

    cy.get('@circleItem').eq(1).contains('Top')
    cy.get('@circleItem')
      .contains('b2')
      .parent()
      .should('have.css', 'border-color', CHANGING_COLOR)

    cy.wait(SHORT_DELAY_IN_MS)

    cy.get('@circleItem')
      .contains('b2')
      .parent()
      .should('have.css', 'border-color', DEFAULT_COLOR)
  })

  it('removing an element from the stack', () => {
    cy.get('input').type('a1{enter}')

    cy.getByData('remove-button').click()

    cy.get(CIRCLE_SELECTOR).should('not.exist')
  })

  it('Correct cleaning of all elements', () => {
    cy.get('input').type('a1{enter}')
    cy.wait(SHORT_DELAY_IN_MS)
    cy.get('input').type('b2{enter}')

    cy.getByData('clear-button').click()
    cy.getByData('clear-button').should('be.disabled')
  })
})
