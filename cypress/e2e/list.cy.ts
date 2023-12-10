/* eslint-disable cypress/no-unnecessary-waiting */
describe('List component test', () => {
  beforeEach(() => {
    cy.visit('/list')
  })

  it('Button disabled', () => {
    cy.getByData('addToHead-button').should('be.disabled')
    cy.getByData('addToTail-button').should('be.disabled')
    cy.getByData('addByIndex-button').should('be.disabled')
    cy.getByData('removeByIndex-button').should('be.disabled')
  })

  it('Rendering the default list', () => {
    cy.get('[class*=circle_content]').should('have.length', 5)
    cy.get('[class*=circle_content]').first().contains('head')
    cy.get('[class*=circle_content]').last().contains('tail')
  })

  it('Adding an element to head', () => {
    cy.getByData('text-input').type('a1')
    cy.getByData('addToHead-button').click()

    cy.get('[class*=circle_content]').first().contains('head')
  })

  it('Adding an element to tail', () => {
    cy.getByData('text-input').type('a1')
    cy.getByData('addToTail-button').click()

    cy.get('[class*=circle_content]').last().contains('tail')
  })

  it('Adding an element by index', () => {
    cy.getByData('text-input').type('a1')
    cy.getByData('index-input').type('3')

    cy.getByData('addByIndex-button').click()

    cy.wait(500 * 3)
    cy.get('[class*=circle_content]').eq(3).should('contain', 'a1')
  })

  it('Removing an element from head', () => {
    cy.get('[class*=circle_content]').first().invoke('text').as('firstCircle')

    cy.getByData('removeInHead-button').click()

    cy.wait(500)
    cy.contains('[class*=circle_content]', '@firstCircle').should('not.exist')
  })

  it('Removing an element from tail', () => {
    cy.get('[class*=circle_content]').last().invoke('text').as('lastCircle')

    cy.getByData('removeInTail-button').click()

    cy.wait(500)
    cy.contains('[class*=circle_content]', '@lastCircle').should('not.exist')
  })

  it('Removing an element by index', () => {
    cy.getByData('index-input').type('2')

    cy.get('[class*=circle_content]').eq(2).invoke('text').as('circleByIndex')

    cy.getByData('removeByIndex-button').click()

    cy.wait(500 * 2)
    cy.contains('[class*=circle_content]', '@circleByIndex').should('not.exist')
  })
})
