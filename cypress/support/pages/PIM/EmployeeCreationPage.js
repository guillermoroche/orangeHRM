

class EmployeeCreationPage {
    constructor() {
        this.employeeFormCard = 'div.orangehrm-card-container:contains("Add Employee")';

        this.employeeFullName = `${this.employeeFormCard} div.oxd-grid-item:contains('Employee Full Name')`;
        this.employeeID = `${this.employeeFormCard} div.oxd-grid-item:contains('Employee Id')`;

        this.employeeIdAlreadyExistsError = `${this.employeeID} span:contains('Employee Id already exists')`;

        this.employeeFirstName = `${this.employeeFullName} input[name='firstName']`;
        this.employeeMiddleName = `${this.employeeFullName} input[name='middleName']`;
        this.employeeLastName = `${this.employeeFullName} input[name='lastName']`;


        this.employeeFirstNameError = `${this.employeeFullName} .--name-grouped-field > :nth-child(1) > span.oxd-text`;
        this.employeeLastNameError = `${this.employeeFullName} .--name-grouped-field > :nth-child(3) > span.oxd-text`;

        this.employeeSwitchLoginDetails = ` ${this.employeeFormCard} div:contains('Create Login Details') input[type='checkbox']`;
        this.employeeUserName = `${this.employeeFormCard} div.oxd-input-group:contains('Username') input`;
        this.employeeUserNameError = `${this.employeeFormCard} div.oxd-input-group:contains('Username')  span.oxd-text`;
        this.employeePassword = `${this.employeeFormCard} div.oxd-input-group:contains('Password') input`;
        //FIXME↓↓↓↓↓ - This selector is wrong, gets both password and confirmed password
        this.employeePasswordError = `${this.employeeFormCard} div.oxd-input-group:contains('Password')  span.oxd-text`;
        //----------------------------------------------------------------------------------
        this.employeeLoginStatus = `${this.employeeFormCard} div.oxd-grid-item:contains('Status') div.oxd-radio-wrapper`;

        this.formActionsBar = `${this.employeeFormCard} div.oxd-form-actions`;
        this.formSaveButton = `${this.formActionsBar} button:contains('Save')`;
        this.formCancelButton = `${this.formActionsBar} button:contains('Cancel')`;
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
            cy.get(this.employeeFirstName).clear().type(firstName);
        }
    }
    checkEmployeeFirstNameEmptyError() {
        cy.get(this.employeeFirstNameError).should('be.visible').and('contain', 'Required');
    }

    fillEmployeeMiddleName(middleName) {
        if (middleName && middleName.length > 0) {
            cy.get(this.employeeMiddleName).clear().type(middleName);
        }
    }

    fillEmployeeLastName(lastName) {
        if (lastName && lastName.length > 0) {
            cy.get(this.employeeLastName).clear().type(lastName);
        }
    }
    checkEmployeeLastNameEmptyError() {
        cy.get(this.employeeLastNameError).should('be.visible').and('contain', 'Required');
    }

    fillEmployeeId(employeeId) {
        cy.get(this.employeeID).clear();
        cy.get(this.employeeID).type(employeeId);
        cy.intercept('GET', '**/web/index.php/api/v2/core/validation/unique**').as('checkUniqueId');
        cy.wait('@checkUniqueId');
    }
    fillEmployeeUserName(userName) {
        if (userName && userName.length > 0) {
            cy.get(this.employeeUserName).clear().type(userName);
        }
    }
    checkEmployeeUsernameEmptyError() {
        cy.get(this.employeeUserNameError).should('be.visible').and('contain', 'Required');
    }


    fillEmployeePassword(password) {
        if (password && password.length > 0) {
            cy.get(this.employeePassword).eq(0).type(password);
        }
    }
    checkEmployeePasswordError() {
        cy.get(this.employeePasswordError).should('be.visible').and('contain', 'Required');
    }


    fillEmployeeConfirmedPassword(confirmedPassword) {
        if (confirmedPassword && confirmedPassword.length > 0) {
            cy.get(this.employeePassword).eq(1).type(confirmedPassword);
        }
    }

    switchLoginDetails() {
        cy.get(this.employeeSwitchLoginDetails).click({ force: true });
    }




    clickSaveButton() {
        cy.get(this.formSaveButton).click();
    }

}

export default EmployeeCreationPage;