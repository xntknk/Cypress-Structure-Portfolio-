class UserPage {
  selectors = {
    addbutton: ".orangehrm-header-container > .oxd-button",
    firstName: 'input[name="firstName"]',
    middleName: 'input[name="middleName"]',
    lastName: 'input[name="lastName"]',
    switch: 'input[type="checkbox"]',
    saveButton: 'button[type="submit"]',
  };
  goto() {
    cy.visit("/pim/viewEmployeeList");
  }
  //Create
  clickAddBtn() {
    cy.get(this.selectors.addbutton).click();
  }
  assertBtn() {
    cy.url().should("include", "/addEmployee");
  }

  fillFname(fName) {
    cy.get(this.selectors.firstName).clear();
    cy.get(this.selectors.firstName).type(fName);
  }

  fillMname(mName) {
    cy.get(this.selectors.middleName).clear();
    cy.get(this.selectors.middleName).type(mName);
  }

  fillLname(lName) {
    cy.get(this.selectors.lastName).clear();
    cy.get(this.selectors.lastName).type(lName);
  }

  clickSaveBtn() {
    cy.get(this.selectors.saveButton).eq(0).click();
    cy.get(".oxd-text--toast-title").should("have.text", "Success");
  }

  createUser(fName, mName, lName) {
    this.fillFname(fName);
    this.fillMname(mName);
    this.fillLname(lName);
    this.clickSaveBtn();
  }

  //Edit
  selectUser() {
    cy.get(".oxd-table-row.oxd-table-row--with-border.oxd-table-row--clickable")
      .eq(0) //click at the first element because first element = latest created user
      .click();
    cy.wait(3000);
    cy.url().should("include", "/viewPersonalDetails");
    cy.get('input[name="firstName"]')
      .invoke("val")
      .then((firstNameValue) => {
        cy.get("h6.oxd-text.oxd-text--h6.--strong")
          .should("be.visible")
          .invoke("text")
          .then((fullNameText) => {
            expect(fullNameText).to.include(firstNameValue);
          });
      });
  }

  //   verifyUpdate(updateName){
  //     cy.get(".oxd-table-row.oxd-table-row--with-border.oxd-table-row--clickable")
  //       .eq(0)
  //       .invoke("text")
  //       .should("include", updateName)

  //   }

  //Delete
  clickDelBtn() {
    cy.get('[class="oxd-icon-button oxd-table-cell-action-space"]:nth-child(2)')
      .eq(0)
      .click();
  }

  confirmDelete(){
    cy.get('[class="oxd-button oxd-button--medium oxd-button--label-danger orangehrm-button-margin"]')
    .click();
    cy.get(".oxd-text--toast-title").should("have.text", "Success");
  }

}
export default new UserPage();
