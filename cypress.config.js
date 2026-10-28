const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://automationexercise.com',
    specPattern: 'cypress/e2e/**/*.js',
    supportFile: 'cypress/support/e2e.js',
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,
    video: false,
    screenshotOnRunFailure: true,
    retries: { runMode: 2, openMode: 0 },
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/resultados',
      overwrite: false,
      html: false,
      json: true
    }
  }
});
