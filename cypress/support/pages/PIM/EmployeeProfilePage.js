class EmployeeProfilePage {
    constructor() {
        this.profileContainer = 'div.orangehrm-edit-employee';

        this.profileNavigation = `${this.profileContainer} div.orangehrm-edit-employee-navigation`;
        this.employeeContent = `${this.profileContainer} div.orangehrm-edit-employee-content`;

        this.personalDetailsForm = `${this.employeeContent} div:contains('Personal Details') form.oxd-form`;

        this.employeeFirstName = `${this.personalDetailsForm} input[name='firstName']`;
        this.employeeMiddleName = `${this.personalDetailsForm} input[name='middleName']`;
        this.employeeLastName = `${this.personalDetailsForm} input[name='lastName']`;
        this.employeeId = `${this.personalDetailsForm} .oxd-input-group:contains('Employee Id') input`;


    }
    waitForEmployeeProfilePageToLoad() {
        cy.intercept('GET', '**/web/index.php/api/v2/pim/employees/**').as('getEmployeeProfile');
        cy.wait('@getEmployeeProfile', { timeout: 20000 }).its('response.statusCode').should('equal', 200);
    }

    
    checkEmployeeProfilePageLoads() {
        cy.get(this.profileContainer).should('be.visible');
        cy.get(this.profileNavigation).should('be.visible');
        cy.get(this.employeeContent).should('be.visible');
        cy.get(this.personalDetailsForm).should('be.visible');

        cy.get(this.employeeFirstName).should('be.visible');
        cy.get(this.employeeMiddleName).should('be.visible');
        cy.get(this.employeeLastName).should('be.visible');

        cy.get(this.employeeId).should('be.visible');
    }

    checkEmployeeFirsrName(firstName) {
        cy.get(this.employeeFirstName).should('have.value', firstName);
    }
    checkEmployeeMiddleName(middleName) {
        cy.get(this.employeeMiddleName).should('have.value', middleName);
    }
    checkEmployeeLastName(lastName) {
        cy.get(this.employeeLastName).should('have.value', lastName);
    }

    checkEmployeeId(employeeId) {
        cy.get(this.employeeId).should('have.value', employeeId);
    }

    

}

export default EmployeeProfilePage;