import './commands';

Cypress.on('uncaught:exception', (error) => {
  // O site possui scripts de terceiros que podem lançar erros fora do teste.
  if (/ResizeObserver|Script error|fbq|grecaptcha/i.test(error.message)) return false;
});
