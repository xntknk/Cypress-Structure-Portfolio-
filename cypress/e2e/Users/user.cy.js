import UserPage from "../../pages/Users/UserPage";
let user;
describe("CRUD Users", () => {
  before(() => {
    cy.fixture("usersData").then((userData) => {
      user = userData;
    });
  });

  beforeEach(() => {
    cy.login();
    UserPage.goto();
  });

  it('Create User', () => {
    UserPage.clickAddBtn();
    UserPage.assertBtn();
    UserPage.createUser(user.userInfo.firstName, user.userInfo.middleName, user.userInfo.lastName);
});
});
