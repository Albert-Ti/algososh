describe('App renders test', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Home page should visit', () => {
    cy.location('pathname').should('eq', '/')
    cy.get('h1').should('contain', 'МБОУ АЛГОСОШ')
  })

  it('Test app all routes', () => {
    function checkRouting(route: string) {
      cy.get(`a[href="${route}"]`).click()
      cy.location('pathname').should('eq', route)

      cy.contains('К оглавлению').click()
      cy.location('pathname').should('eq', '/')
    }

    checkRouting('/recursion')
    checkRouting('/fibonacci')
    checkRouting('/sorting')
    checkRouting('/stack')
    checkRouting('/queue')
    checkRouting('/list')
  })
})
