class UserManagementPage {
    constructor() {
        this.userManagementURL = 'web/index.php/api/v2/admin/users';


        this.userFilter = 'div.oxd-table-filter:contains("System Users")';

        this.filterUsername = `${this.userFilter} div.oxd-grid-item:contains('Username') input`;
        this.filterUserRole = `${this.userFilter} div.oxd-grid-item:contains('User Role') div.oxd-select-text`;
        this.filterEmployeeName = `${this.userFilter} div.oxd-grid-item:contains('Employee Name') input`;
        this.filterEmployeeNameDropdown = `${this.userFilter} div.oxd-grid-item:contains('Employee Name') div.oxd-autocomplete-dropdown div.oxd-autocomplete-option`;
        this.filterStatus = `${this.userFilter} div.oxd-grid-item:contains('Status') div.oxd-select-text`;

        this.searchButton = `${this.userFilter} button:contains('Search')`;
        this.resetButton = `${this.userFilter} button:contains('Reset')`;

        this.addUserButton = 'div.orangehrm-header-container button:contains("Add")';

        this.userTable = 'div.oxd-table-body';
        this.userTableRows = `${this.userTable} div.oxd-table-row`;
        this.userTableDeleteButton = 'i.bi-trash';
        this.userTableEditButton = 'i.bi-pencil-fill';

        this.deleteDialogPopup = 'div.oxd-dialog-sheet';
        this.deleteDialogDeleteButton = 'button:contains("Delete")';
    }

    checkUserManagementPageLoads() {
        cy.intercept('GET', `**${this.userManagementURL}**`).as('getAdminModule');
        cy.wait('@getAdminModule').its('response.statusCode').should('equal', 200);

        cy.get(this.userFilter).should('be.visible');

        cy.get(this.filterUsername).should('be.visible');
        cy.get(this.filterUserRole).should('be.visible');
        cy.get(this.filterEmployeeName).should('be.visible');
        cy.get(this.filterStatus).should('be.visible');

        cy.get(this.searchButton).should('be.visible');
        cy.get(this.resetButton).should('be.visible');
        cy.get(this.addUserButton).should('be.visible');

        cy.get(this.userTable).should('be.visible');
        cy.get(this.userTableRows).should('have.length.greaterThan', 0);
    }
    /**
     * Fills the username input field with the provided username.
     *
     * @param {string} username - The username to be entered into the input field.
     */
    fillUsername(username) {
        cy.log('Filling in the username: ' + username);
        cy.get(this.filterUsername).clear();
        cy.get(this.filterUsername).type(username);
    }

    fillUserRole(userRole) {
        //TODO: Implement the fillUserRole method    
    }
    fillEmployeeName(employeeName) {
        if (employeeName.length > 0) {
            cy.get(this.filterEmployeeName).should('be.visible').type(employeeName);
            cy.intercept('GET', '**/web/index.php/api/v2/pim/employees**').as('getEmployees_${Cypress._.random(1, 10000)}');
            cy.wait('@getEmployees_${Cypress._.random(1, 10000)}');
            cy.get(this.filterEmployeeNameDropdown).first().click();
        }
    }
    fillStatus(status) {
        //TODO: Implement the fillStatus method
    }

    clickSearchButton() {
        cy.get(this.searchButton).click();
    }
    clickAddUserButton() {
        cy.get(this.addUserButton).should('be.enabled').click(); 
    }
    

    checkSearchResults(searchCriteria) {
        cy.get(this.userTableRows).should('have.length', 1);
        cy.get(this.userTableRows).within(() => {
            cy.get('div:nth-child(2)').should('have.text', searchCriteria.username).should('be.visible');
            cy.get('div:nth-child(4)').should('have.text', searchCriteria.employeeName).should('be.visible');
        });

    }

    clickDeleteUser(searchCriteria) {
        cy.get(this.userTableRows + `:contains(${searchCriteria.username})`).within(() => {
            cy.get(this.userTableDeleteButton).click();
        });
    }

    clickEditUser(searchCriteria) {
        cy.get(this.userTableRows + `:contains(${searchCriteria.username})`).within(() => {
            cy.get(this.userTableEditButton).click();
        });

    }

    confirmDeleteUser() {
        cy.get(this.deleteDialogPopup).should('be.visible');
        cy.get(this.deleteDialogDeleteButton).click();
    }

}

export default UserManagementPage;