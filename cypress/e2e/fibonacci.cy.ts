/* eslint-disable cypress/no-unnecessary-waiting */
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

    cy.get('[class*=circle]').contains('1')
    cy.wait(500)
    cy.get('[class*=circle]').contains('2')
    cy.wait(500)
    cy.get('[class*=circle]').contains('3')
    cy.wait(500)
    cy.get('[class*=circle]').contains('5')
    cy.wait(500)
    cy.get('[class*=circle]').contains('8')
    cy.wait(500)
    cy.get('[class*=circle]').contains('13')
    cy.wait(500)
    cy.get('[class*=circle]').contains('21')
  })
})
