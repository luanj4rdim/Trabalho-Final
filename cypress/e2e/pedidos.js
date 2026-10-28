describe('Pedidos - casos de teste 15 e 16', () => {
  const password = 'Cypress@123';
  const createAndOrder = (loginBeforeCheckout) => {
    cy.goHome(); cy.openLogin(); cy.registerUser({ password }).then((user) => {
      if (loginBeforeCheckout) cy.get('a[href="/logout"]').click().then(() => { cy.openLogin(); cy.login(user.email, password); });
      cy.get('a[href="/products"]').first().click(); cy.addFirstProduct(); cy.get('a[href="/view_cart"]').filter(':visible').first().click();
      cy.contains('Shopping Cart').should('be.visible'); cy.checkoutAndPay(); cy.deleteAccount();
    });
  };
  it('CT 15 - realiza pedido após cadastro antes do checkout', () => createAndOrder(false));
  it('CT 16 - realiza pedido após login antes do checkout', () => createAndOrder(true));
});
