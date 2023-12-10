import { SHORT_DELAY_IN_MS } from '../../src/constants/delays'
import { CIRCLE_SELECTOR } from '../support/constants'

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
    cy.get(CIRCLE_SELECTOR).as('circleItem')
    cy.get('@circleItem').should('have.length', 5)
    cy.get('@circleItem').first().contains('head')
    cy.get('@circleItem').last().contains('tail')
  })

  it('Adding an element to head', () => {
    cy.getByData('text-input').type('a1')
    cy.getByData('addToHead-button').click()

    cy.get(CIRCLE_SELECTOR).first().contains('head')
  })

  it('Adding an element to tail', () => {
    cy.getByData('text-input').type('a1')
    cy.getByData('addToTail-button').click()

    cy.get(CIRCLE_SELECTOR).last().contains('tail')
  })

  it('Adding an element by index', () => {
    cy.getByData('text-input').type('a1')
    cy.getByData('index-input').type('3')

    cy.getByData('addByIndex-button').click()

    cy.wait(SHORT_DELAY_IN_MS * 3)
    cy.get(CIRCLE_SELECTOR).eq(3).should('contain', 'a1')
  })

  it('Removing an element from head', () => {
    cy.get(CIRCLE_SELECTOR).first().invoke('text').as('firstCircle')

    cy.getByData('removeInHead-button').click()

    cy.wait(SHORT_DELAY_IN_MS)
    cy.contains(CIRCLE_SELECTOR, '@firstCircle').should('not.exist')
  })

  it('Removing an element from tail', () => {
    cy.get(CIRCLE_SELECTOR).last().invoke('text').as('lastCircle')

    cy.getByData('removeInTail-button').click()

    cy.wait(SHORT_DELAY_IN_MS)
    cy.contains(CIRCLE_SELECTOR, '@lastCircle').should('not.exist')
  })

  it('Removing an element by index', () => {
    cy.getByData('index-input').type('2')

    cy.get(CIRCLE_SELECTOR).eq(2).invoke('text').as('circleByIndex')

    cy.getByData('removeByIndex-button').click()

    cy.wait(SHORT_DELAY_IN_MS * 2)
    cy.contains(CIRCLE_SELECTOR, '@circleByIndex').should('not.exist')
  })
})
