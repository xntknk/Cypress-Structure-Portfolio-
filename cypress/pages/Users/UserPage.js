class UserPage {

    selectors = {
        addbutton : '.orangehrm-header-container > .oxd-button',
        firstName : 'input[name="firstName"]',
        middleName : 'input[name="middleName"]',
        lastName : 'input[name="lastName"]',
        switch : 'input[type="checkbox"]',
        saveButton : 'button[type="submit"]'

    }
    goto() {
        cy.visit('/pim/viewEmployeeList');
    }

    clickAddBtn(){
        cy.get(this.selectors.addbutton).click()

    }
    assertBtn(){
        cy.url().should("include", "/addEmployee");
    }

    fillFname(fName){
        cy.get(this.selectors.firstName).clear();
        cy.get(this.selectors.firstName).type(fName);
    }

    fillMname(mName){
        cy.get(this.selectors.middleName).clear();
        cy.get(this.selectors.middleName).type(mName);
    }

    fillLname(lName){
        cy.get(this.selectors.lastName).clear();
        cy.get(this.selectors.lastName).type(lName);
    }

    clickSaveBtn(){
        cy.get(this.selectors.saveButton).click();
    }

    createUser(fName,mName,lName){
        this.fillFname(fName);
        this.fillMname(mName);
        this.fillLname(lName);
        this.clickSaveBtn();
    }

} export default new UserPage();