import LoginPage from "../../pages/Login/LoginPage";

let login;

describe("Login Page", () => {
  before(() => {
    
    cy.fixture("loginData.dev.json").then((loginData) => {
      login = loginData;
    });
  });

  beforeEach(() => {
    LoginPage.goto();
  });

  it("Login with a valid user", () => {
    LoginPage.login(login.validUser.username, login.validUser.password);

    cy.url().should("not.include", "/login");
    cy.contains("Dashboard").should("be.visible");
  });

  it('Login with an invalid user', () => {
    LoginPage.login(login.invalidUser.username, login.invalidUser.password);
    LoginPage.assertError();
  });

  it('Login by leaving username and password field empty', () => {
    LoginPage.submit();
    LoginPage.assertRequire();
  })
});
