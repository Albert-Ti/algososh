import { DEFAULT_COLOR, MODIFIED_COLOR } from '../support/constants'

describe('String component tests', () => {
  beforeEach(() => {
    cy.visit('/recursion')
  })

  it('button disabled', () => {
    cy.get('input').should('be.empty')
    cy.get('button').should('be.disabled')
  })

  it('String reversal animation test', () => {
    cy.get('input').type('hello{enter}')
    cy.get('button').should('be.not.disabled')

    cy.get('[data-testid="circles"]').children().as('circles')

    cy.get('@circles')
      .first()
      .contains('h')
      .parent()
      .should('have.css', 'border-color', DEFAULT_COLOR)
    cy.get('@circles')
      .last()
      .contains('o')
      .parent()
      .should('have.css', 'border-color', DEFAULT_COLOR)

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500)

    cy.get('@circles')
      .first()
      .contains('o')
      .parent()
      .should('have.css', 'border-color', MODIFIED_COLOR)
    cy.get('@circles')
      .last()
      .contains('h')
      .parent()
      .should('have.css', 'border-color', MODIFIED_COLOR)
  })
})
