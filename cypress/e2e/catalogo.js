describe('Catálogo - casos de teste 8 e 9', () => {
  beforeEach(() => { cy.goHome(); cy.assertHome(); cy.get('a[href="/products"]').click(); });
  it('CT 8 - exibe os produtos e os detalhes do primeiro produto', () => {
    cy.contains('h2', 'All Products').should('be.visible'); cy.get('.features_items .product-image-wrapper').should('have.length.greaterThan', 0);
    cy.contains('View Product').first().click(); cy.get('.product-information').within(() => {
      cy.get('h2').should('be.visible'); cy.contains('Category:').should('be.visible'); cy.contains('Rs.').should('be.visible');
      cy.contains('Availability:').should('be.visible'); cy.contains('Condition:').should('be.visible'); cy.contains('Brand:').should('be.visible');
    });
  });
  it('CT 9 - pesquisa produtos', () => {
    cy.get('#search_product').type('dress'); cy.get('#submit_search').click(); cy.contains('Searched Products').should('be.visible');
    cy.get('.features_items .productinfo').should('have.length.greaterThan', 0);
  });
});
