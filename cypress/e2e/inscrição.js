describe('Assinatura - caso de teste 10', () => {
  it('CT 10 - realiza assinatura pelo rodapé da página inicial', () => {
    cy.goHome(); cy.assertHome(); cy.get('footer').scrollIntoView(); cy.contains('h2', 'Subscription').should('be.visible');
    cy.get('#susbscribe_email').type(`subscription_${Date.now()}@example.com`); cy.get('#subscribe').click();
    cy.contains('You have been successfully subscribed!').should('be.visible');
  });
});
