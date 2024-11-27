class UserManagementPage {
    constructor() {
        this.userManagementURL = 'web/index.php/api/v2/admin/users';


        this.userFilter = 'div.oxd-table-filter:contains("System Users")';

        this.filterUsername = `${this.userFilter} div.oxd-grid-item:contains('Username') input`;
        this.filterUserRole = `${this.userFilter} div.oxd-grid-item:contains('User Role') div.oxd-select-text`;
        this.filterEmployeeName = `${this.userFilter} div.oxd-grid-item:contains('Employee Name') input`;
        this.filterStatus = `${this.userFilter} div.oxd-grid-item:contains('Status') div.oxd-select-text`;

        this.searchButton = `${this.userFilter} button:contains('Search')`;
        this.resetButton = `${this.userFilter} button:contains('Reset')`;

        this.addUserButton = 'div.orangehrm-header-container button:contains("Add")';

        this.userTable = 'div.oxd-table-body';
        this.userTableRows = `${this.userTable} div.oxd-table-card`;
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
    testMethod() {
        cy.log('This is a test method');
    }
    /**
     * Fills the username input field with the provided username.
     *
     * @param {string} username - The username to be entered into the input field.
     */
    fillUsername(username) {
        cy.get(this.filterUsername).clear();
        cy.get(this.filterUsername).type(username);
    }

    clickSearchButton() {
        cy.get(this.searchButton).click();
    } 
    
    checkSearchResults(username, employeeName) {
        cy.get(this.userTableRows).should('have.length', 1);
        cy.get(this.userTableRows).within(() => {
            cy.get('div:nth-child(2)').should('have.text', username);
            cy.get('div:nth-child(4)').should('have.text', employeeName.firstName + ' ' + employeeName.lastName).should('be.visible');
        });

    }

}

export default UserManagementPage;