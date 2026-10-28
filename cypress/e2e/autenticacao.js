describe('Autenticação - casos de teste 1, 2, 3, 4 e 5', () => {
  const password = 'Cypress@123';

  it('CT 1 - cadastra e exclui um usuário', () => {
    cy.goHome(); cy.assertHome(); cy.openLogin(); cy.contains('New User Signup!').should('be.visible');
    cy.registerUser().then(() => cy.deleteAccount());
  });

  it('CT 2 - realiza login com credenciais válidas', () => {
    cy.goHome(); cy.openLogin(); cy.registerUser({ password }).then((user) => {
      cy.get('a[href="/logout"]').click(); cy.openLogin(); cy.login(user.email, password);
      cy.contains('Logged in as').should('be.visible'); cy.deleteAccount();
    });
  });

  it('CT 3 - rejeita credenciais inválidas', () => {
    cy.goHome(); cy.openLogin(); cy.contains('Login to your account').should('be.visible');
    cy.login(`invalid_${Date.now()}@example.com`, 'wrong-password');
    cy.contains('Your email or password is incorrect!').should('be.visible');
  });

  it('CT 4 - realiza logout de um usuário autenticado', () => {
    cy.goHome(); cy.openLogin(); cy.registerUser({ password }).then((user) => {
      cy.get('a[href="/logout"]').click(); cy.url().should('include', '/login');
      cy.login(user.email, password); cy.get('a[href="/delete_account"]').click(); cy.contains('Account Deleted!').should('be.visible');
    });
  });

  it('CT 5 - rejeita um e-mail já cadastrado', () => {
    cy.goHome(); cy.openLogin(); cy.registerUser().then((user) => {
      cy.get('a[href="/logout"]').click(); cy.openLogin();
      cy.get('[data-qa="signup-name"]').type('Existing User'); cy.get('[data-qa="signup-email"]').type(user.email);
      cy.get('[data-qa="signup-button"]').click(); cy.contains('Email Address already exist!').should('be.visible');
    });
  });
});
