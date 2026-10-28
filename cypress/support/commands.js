const selectors = {
  signupLogin: 'a[href="/login"]',
  products: 'a[href="/products"]',
  cart: 'a[href="/view_cart"]',
  deleteAccount: 'a[href="/delete_account"]',
  logout: 'a[href="/logout"]',
  loginEmail: 'form[action="/login"] input[data-qa="login-email"]',
  loginPassword: 'form[action="/login"] input[data-qa="login-password"]',
  signupName: 'form[action="/signup"] input[data-qa="signup-name"]',
  signupEmail: 'form[action="/signup"] input[data-qa="signup-email"]',
  search: '#search_product',
  searchButton: '#submit_search',
  subscriptionEmail: '#susbscribe_email',
  subscriptionButton: '#subscribe'
};

const uniqueEmail = () => `qa_${Date.now()}_${Cypress._.random(1000, 9999)}@example.com`;

Cypress.Commands.add('goHome', () => cy.visit('/'));
Cypress.Commands.add('openLogin', () => cy.get(selectors.signupLogin).click());
Cypress.Commands.add('assertHome', () => cy.get('body').should('contain.text', 'Full-Fledged practice website for Automation Engineers'));
Cypress.Commands.add('login', (email, password) => {
  cy.get(selectors.loginEmail).type(email);
  cy.get(selectors.loginPassword).type(password, { log: false });
  cy.get('form[action="/login"] button[data-qa="login-button"]').click();
});
Cypress.Commands.add('deleteAccount', () => {
  cy.get(selectors.deleteAccount).click();
  cy.contains('b', 'Account Deleted!').should('be.visible');
});
Cypress.Commands.add('registerUser', (user = {}) => {
  const data = { name: 'Cypress QA', email: uniqueEmail(), password: 'Cypress@123', ...user };
  cy.get(selectors.signupName).type(data.name);
  cy.get(selectors.signupEmail).type(data.email);
  cy.get('form[action="/signup"] button[data-qa="signup-button"]').click();
  cy.contains('b', 'Enter Account Information').should('be.visible');
  cy.get('#id_gender1').check();
  cy.get('#password').type(data.password);
  cy.get('#days').select('10'); cy.get('#months').select('May'); cy.get('#years').select('1990');
  cy.get('#newsletter').check(); cy.get('#optin').check();
  cy.get('#first_name').type('Cypress'); cy.get('#last_name').type('Tester');
  cy.get('#company').type('QA Company'); cy.get('#address1').type('123 Test Street');
  cy.get('#address2').type('Suite 1'); cy.get('#country').select('Canada');
  cy.get('#state').type('Ontario'); cy.get('#city').type('Toronto'); cy.get('#zipcode').type('12345');
  cy.get('#mobile_number').type('11999999999');
  cy.get('button[data-qa="create-account"]').click();
  cy.contains('b', 'Account Created!').should('be.visible');
  cy.get('a[data-qa="continue-button"]').click();
  cy.contains('Logged in as').should('be.visible');
  return cy.wrap(data);
});
Cypress.Commands.add('addFirstProduct', () => {
  cy.get('.features_items .productinfo').first().find('a.add-to-cart').click({ force: true });
  cy.contains('Continue Shopping').should('be.visible').click();
});
Cypress.Commands.add('checkoutAndPay', () => {
  cy.contains('a, button', 'Proceed To Checkout').should('be.visible').click();
  cy.contains('Address Details').should('be.visible');
  cy.get('textarea[name="message"]').type('Pedido criado pela automação Cypress');
  cy.contains('Place Order').click();
  cy.get('[data-qa="name-on-card"]').type('Cypress Tester');
  cy.get('[data-qa="card-number"]').type('4111111111111111');
  cy.get('[data-qa="cvc"]').type('123'); cy.get('[data-qa="expiry-month"]').type('12'); cy.get('[data-qa="expiry-year"]').type('2030');
  cy.get('[data-qa="pay-button"]').click();
  cy.contains('Order Placed!').should('be.visible');
});

Object.entries(selectors).forEach(([name, value]) => Cypress.Commands.add(`selector${name[0].toUpperCase()}${name.slice(1)}`, () => cy.get(value)));
