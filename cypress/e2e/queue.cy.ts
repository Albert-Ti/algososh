import { SHORT_DELAY_IN_MS } from '../../src/constants/delays'
import { CIRCLE_SELECTOR } from '../support/constants'

describe('Queue component tests', () => {
  beforeEach(() => {
    cy.visit('/queue')
  })

  it('Button disabled', () => {
    cy.get('input').should('be.empty')
    cy.getByData('submit-button').should('be.disabled')
    cy.getByData('remove-button').should('be.disabled')
    cy.getByData('clear-button').should('be.disabled')
  })

  it('The element is added to the queue and that the head and tail cursors are rendered correctly', () => {
    // add first-element
    cy.get('input').type('a1{enter}')
    cy.get(CIRCLE_SELECTOR).eq(0).as('firstCircle')

    cy.get('@firstCircle').children('[class*=circle_changing]')
    cy.get('@firstCircle').contains('head')
    cy.get('@firstCircle').contains('tail')
    cy.get('@firstCircle').contains('a1')

    cy.wait(SHORT_DELAY_IN_MS)

    cy.get('@firstCircle').children('[class*=circle_default]')
    cy.get('@firstCircle').contains('head')

    // add second-element
    cy.get('input').type('b2{enter}')
    cy.get(CIRCLE_SELECTOR).eq(1).as('secondCircle')

    cy.get('@secondCircle').contains('b2')
    cy.get('@secondCircle').contains('tail')
  })

  it('Removing an element from the queue', () => {
    cy.get('input').type('a1{enter}')
    cy.wait(SHORT_DELAY_IN_MS)
    cy.get('input').type('b2{enter}')

    cy.get(CIRCLE_SELECTOR).eq(0).should('contain', 'head')

    cy.getByData('remove-button').click()

    cy.get(CIRCLE_SELECTOR).eq(0).should('not.contain', 'head')
  })

  it('Correct cleaning of all elements', () => {
    cy.get('input').type('a1{enter}')
    cy.wait(SHORT_DELAY_IN_MS)
    cy.get('input').type('b2{enter}')

    cy.getByData('clear-button').click()

    cy.getByData('clear-button').should('be.disabled')
  })
})
