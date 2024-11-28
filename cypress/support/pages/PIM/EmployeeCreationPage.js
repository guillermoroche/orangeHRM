

class EmployeeCreationPage {
    constructor() {
        this.employeeFormCard = 'div.orangehrm-card-container:contains("Add Employee")';
        
        this.employeeFullName = `${this.employeeFormCard} div.oxd-grid-item:contains('Employee Full Name')`;
        this.employeeID = `${this.employeeFormCard} div.oxd-grid-item:contains('Employee Id')`;

        this.employeeIdAlreadyExistsError = `${this.employeeID} span:contains('Employee Id already exists')`;

        this.employeeFirstName = `${this.employeeFullName} input[name='firstName']`;
        this.employeeMiddleName = `${this.employeeFullName} input[name='middleName']`;
        this.employeeLastName = `${this.employeeFullName} input[name='lastName']`;

        this.employeeSwitchLoginDetails = ` ${this.employeeFormCard} div:contains('Create Login Details') input[type='checkbox']`;
        this.employeeUserName = `${this.employeeFormCard} div.oxd-input-group:contains('Username') input`;
        this.employeePassword = `${this.employeeFormCard} div.oxd-input-group:contains('Password') input`;
        this.employeeLoginStatus =  `${this.employeeFormCard} div.oxd-grid-item:contains('Status') div.oxd-radio-wrapper`;

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

    fillEmployeeForm(employeeData) {
        cy.get(this.employeeFirstName).type(employeeData.firstName);
        cy.get(this.employeeMiddleName).type(employeeData.middleName);
        cy.get(this.employeeLastName).type(employeeData.lastName);
    }

    fillEmployeeLoginDetails(username, password, confirmedPassword, status) {
        cy.get(this.employeeSwitchLoginDetails).check({ force: true });
        cy.get(this.employeeUserName).type(username);
        cy.get(this.employeePassword).eq(0).type(password); 
        
        if (confirmedPassword && confirmedPassword.length > 0) {
            cy.get(this.employeePassword).eq(1).type(confirmedPassword);
        } else {
            cy.get(this.employeePassword).eq(1).type(password);
        }
        
        
        if (status && status.length > 0) {
            cy.get(this.employeeLoginStatus+ `:contains('` + status + `') label`).click();
        }
    }

    fillEmployeeId(employeeId) {
        cy.get(this.employeeID).clear();
        cy.get(this.employeeID).type(employeeId);
        cy.intercept('GET', '**/web/index.php/api/v2/core/validation/unique**').as('checkUniqueId');
        cy.wait('@checkUniqueId');
    }

    clickSaveButton() {
        cy.get(this.formSaveButton).click();
    }

    /**
     * Adds a new employee to the system by filling out the employee form and optionally the login details.
     *
     * @param {string} employeeName - The name of the employee.
     * @param {string} employeeId - The ID of the employee.
     * @param {string} [employeeUserName] - The username for the employee's login (optional).
     * @param {string} [employeePassword] - The password for the employee's login (optional).
     * @param {string} [employeeStatus] - The status of the employee (optional).
     */
    addEmployee(employeeName, employeeId, employeeUserName, employeePassword, employeeStatus) {
        this.fillEmployeeForm(employeeName);
        this.fillEmployeeId(employeeId);
        if (arguments.length > 2) {
            this.fillEmployeeLoginDetails(employeeUserName, employeePassword, employeePassword, employeeStatus);
        }
        this.clickSaveButton();
    }
}

export default EmployeeCreationPage;