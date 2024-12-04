

class EmployeeCreationPage {
    constructor() {
        this.employeeFormCard = 'div.orangehrm-card-container:contains("Add Employee")';

        this.employeeFullName = `${this.employeeFormCard} div.oxd-grid-item:contains('Employee Full Name')`;

        this.formInputFields = {
            employeeFirstName :      `${this.employeeFullName} input[name='firstName']`,
            employeeMiddleName : `${this.employeeFullName} input[name='middleName']`,
            employeeLastName :      `${this.employeeFullName} input[name='lastName']`,
            employeeID :                     `${this.employeeFormCard} div.oxd-grid-item:contains('Employee Id')`,
            employeeUserName :     `${this.employeeFormCard} div.oxd-input-group:contains('Username') input`,
            employeePassword :       `${this.employeeFormCard} div.oxd-input-group:contains('Password') input`,
        }

        this.employeeLoginStatus = `${this.employeeFormCard} div.oxd-grid-item:contains('Status') div.oxd-radio-wrapper`;
        
        this.errors = {
            employeeUserNameError: `${this.employeeFormCard} div.oxd-input-group:contains('Username')  span.oxd-text`,
            employeeFirstNameError: `${this.employeeFullName} .--name-grouped-field > :nth-child(1) > span.oxd-text`,
            employeeLastNameError: `${this.employeeFullName} .--name-grouped-field > :nth-child(3) > span.oxd-text`,
            employeeIdAlreadyExistsError : `${this.employeeID} span:contains('Employee Id already exists')`,
            //FIXME↓↓↓↓↓ - This selector is wrong, gets both password and confirmed password 
            employeePasswordError : `${this.employeeFormCard} div.oxd-input-group:contains('Password')  span.oxd-text`,
        }

        this.formActionsBar = `${this.employeeFormCard} div.oxd-form-actions`;

        this.buttons = {
            employeeSwitchLoginDetails : ` ${this.employeeFormCard} div:contains('Create Login Details') input[type='checkbox']`,
            formSaveButton : `${this.formActionsBar} button:contains('Save')`,
            formCancelButton : `${this.formActionsBar} button:contains('Cancel')`,
        }
    }

    checkThatEmployeeFormLoads() {
        cy.get(this.employeeFormCard).should('be.visible');
        cy.get(this.employeeFullName).should('be.visible');

        cy.get(this.employeeFirstName).should('be.visible');
        cy.get(this.employeeMiddleName).should('be.visible');
        cy.get(this.employeeLastName).should('be.visible');

        cy.get(this.employeeID).should('be.visible');

        cy.get(this.formActionsBar).should('be.visible');
        cy.get(this.formSaveButton).should('be.visible');
        cy.get(this.formCancelButton).should('be.visible');

    }

    checkEmployeeIdAlreadyExistsError() {
        cy.get(this.employeeIdAlreadyExistsError).should('be.visible');
    }
    fillEmployeeFirstName(firstName) {
        if (firstName && firstName.length > 0) {
            cy.get(this.formInputFields.employeeFirstName).clear().type(firstName);
        }
    }
    checkEmployeeFirstNameEmptyError() {
        cy.get(this.errors.employeeFirstNameError).should('be.visible').and('contain', 'Required');
    }

    fillEmployeeMiddleName(middleName) {
        if (middleName && middleName.length > 0) {
            cy.get(this.formInputFields.employeeMiddleName).clear().type(middleName);
        }
    }

    fillEmployeeLastName(lastName) {
        if (lastName && lastName.length > 0) {
            cy.get(this.formInputFields.employeeLastName).clear().type(lastName);
        }
    }
    checkEmployeeLastNameEmptyError() {
        cy.get(this.errors.employeeLastNameError).should('be.visible').and('contain', 'Required');
    }

    fillEmployeeId(employeeId) {
        cy.get(this.formInputFields.employeeID).clear();
        cy.get(this.formInputFields.employeeID).type(employeeId);
        cy.intercept('GET', '**/web/index.php/api/v2/core/validation/unique**').as('checkUniqueId');
        cy.wait('@checkUniqueId');
    }
    fillEmployeeUsername(userName) {
        if (userName && userName.length > 0) {
            cy.get(this.formInputFields.employeeUserName).clear().type(userName);
        }
    }
    checkEmployeeUsernameEmptyError() {
        cy.get(this.errors.employeeUserNameError).should('be.visible').and('contain', 'Required');
    }


    fillEmployeePassword(password) {
        if (password && password.length > 0) {
            cy.get(this.formInputFields.employeePassword).eq(0).type(password);
        }
    }
    checkEmployeePasswordError() {
        cy.get(this.errors.employeePasswordError).should('be.visible').and('contain', 'Required');
    }


    fillEmployeeConfirmedPassword(confirmedPassword) {
        if (confirmedPassword && confirmedPassword.length > 0) {
            cy.get(this.formInputFields.employeePassword).eq(1).type(confirmedPassword);
        }
    }

    switchLoginDetails() {
        cy.get(this.buttons.employeeSwitchLoginDetails).click({ force: true });
    }

    setEmployeeLoginStatus(status) {
        cy.get(this.employeeLoginStatus).contains(status).click();
    }


    clickSaveButton() {
        cy.get(this.buttons.formSaveButton).click();
    }

}

export default EmployeeCreationPage;