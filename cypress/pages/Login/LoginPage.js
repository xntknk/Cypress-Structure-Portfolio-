class LoginPage {
  // Store selectors here
  selectors = {
    usernameInput: 'input[name="username"]',
    passwordInput: 'input[name="password"]',
    loginBtn: 'button[type="submit"]',
    errorMessage: 'div[role="alert"]',
    requireMessage: "span",
  };
  goto() {
    cy.visit("/");
  }

  fillUsername(username) {
    cy.get(this.selectors.usernameInput)
      .should("be.visible")
      .clear()
      .type(username);
  }

  fillPassword(password) {
    cy.get(this.selectors.passwordInput)
      .should("be.visible")
      .clear()
      .type(password);
  }

  submit() {
    cy.get(this.selectors.loginBtn).should("be.visible").click();
  }

  login(username, password) {
    this.fillUsername(username);
    this.fillPassword(password);
    this.submit();
  }

//   loginWithEnvUser() {
//     const u = Cypress.env("ADMIN_USERNAME");
//     const p = Cypress.env("ADMIN_PASSWORD");
//     this.login(u, p);
//   }

  assertLoggedIn() {
    cy.url().should("not.include", "/login");
    cy.contains("Dashboard", { matchCase: false }).should("be.visible");
  }

  assertError(message = "Invalid credentials") {
    cy.get(this.selectors.errorMessage).should("be.visible");
    cy.get(this.selectors.errorMessage).should("contain", message);
  }

  assertRequire(message = "Required") {
    cy.get(this.selectors.requireMessage).should("be.visible");
    cy.get(this.selectors.requireMessage).should("contain", message);
  }
}
export default new LoginPage();
