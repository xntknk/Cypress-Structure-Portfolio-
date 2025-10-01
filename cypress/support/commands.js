// cypress/support/commands.js
import LoginPage from "../pages/Login/LoginPage"

Cypress.Commands.add('login', () => {
  const username = Cypress.env("ADMIN_USERNAME");
  const password = Cypress.env("ADMIN_PASSWORD");

  cy.session([username, password], () => {
    LoginPage.goto();
    LoginPage.login(username, password);
  });
});
