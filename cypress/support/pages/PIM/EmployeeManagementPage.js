class EmployeeManagementPage {
    constructor() {

        this.filterForm = 'div.oxd-table-filter:contains("Employee Information")';
        this.filterFormGridItem = `${this.filterForm} div.oxd-grid-item`;


        this.filterEmployeeName = `${this.filterFormGridItem}:contains('Employee Name') input`;
        this.filterEmployeeNameSuggestions = `${this.filterFormGridItem}:contains('Employee Name') div[role='listbox'] div[role='option']`;
        this.filterEmployeeId = `${this.filterFormGridItem}:contains('Employee Id') input`;
        this.filterEmploymentStatus = `${this.filterFormGridItem}:contains('Employment Status') div.oxd-select-text`;
        this.filterCurrentOrPastEmployees = `${this.filterFormGridItem}:contains('Include') div.oxd-select-text`;
        this.filterSupervisorName = `${this.filterFormGridItem}:contains('Supervisor Name') input`;
        this.filterJobTitle = `${this.filterFormGridItem}:contains('Job Title') div.oxd-select-text`;
        this.filterSubUnit = `${this.filterFormGridItem}:contains('Sub Unit') div.oxd-select-text`;

        this.filterButtonsBar = `${this.filterForm} div.oxd-form-actions`;

        this.searchButton = `${this.filterButtonsBar} button:contains('Search')`;
        this.resetButton = `${this.filterButtonsBar} button:contains('Reset')`;

        this.employeeTableSection = 'div.orangehrm-paper-container';

        this.addEmployeeButton = `${this.employeeTableSection} button:contains('Add')`;
        this.employeeTablerows = `${this.employeeTableSection} div.oxd-table-body div.oxd-table-row`;

        this.searchQueryURL = '**web/index.php/api/v2/pim/employees**';
    }

    checkEmployeeManagementPageLoads() {
        cy.get(this.filterForm).should('be.visible');

        cy.get(this.filterEmployeeName).should('be.visible');
        cy.get(this.filterEmployeeId).should('be.visible');
        cy.get(this.filterEmploymentStatus).should('be.visible');
        cy.get(this.filterCurrentOrPastEmployees).should('be.visible');
        cy.get(this.filterSupervisorName).should('be.visible');
        cy.get(this.filterJobTitle).should('be.visible');
        cy.get(this.filterSubUnit).should('be.visible');

        cy.get(this.filterButtonsBar).should('be.visible');

        cy.get(this.searchButton).should('be.visible');
        cy.get(this.resetButton).should('be.visible');

        cy.get(this.employeeTableSection).should('be.visible');
        cy.get(this.addEmployeeButton).should('be.visible');
        cy.get(this.employeeTablerows).should('have.length.greaterThan', 0);

    }
    //-------------------------------------------------------------------------------------------------
    //Filling input fields
    //------------------------------------------------------------------------------------------------
    fillEmployeeFullName(employeeName) {
        cy.get(this.filterEmployeeName).type(employeeName);
        cy.intercept('GET', '**/web/index.php/api/v2/pim/employees?nameOrId**').as('getEmployeeSearch');
        cy.wait('@getEmployeeSearch');
        cy.get(this.filterEmployeeNameSuggestions).click();
    }
    fillEmployeeId(employeeId) {
        cy.get(this.filterEmployeeId).type(employeeId);
    }
    fillEmploymentStatus(employmentStatus) {
        //TODO - Implement fillEmploymentStatus method
    }
    fillInclude(include) {
        //TODO - Implement fillInclude method
    }
    fillSupervisorName(supervisorName) {
        //TODO - Implement fillSupervisorName method
    }
    fillJobTitle(jobTitle) {
        //TODO - Implement fillJobTitle method
    }
    fillSubUnit(subUnit) {
        //TODO - Implement fillSubUnit method
    }
    //-------------------------------------------------------------------------------------------------
    //Clicking buttons
    //-------------------------------------------------------------------------------------------------
    clickSearchButton() {
        cy.intercept('GET', '**/web/index.php/api/v2/pim/employees**').as('getEmployeeSearchResults');
        cy.get(this.searchButton).click();
        cy.wait('@getEmployeeSearchResults').its('response.statusCode').should('equal', 200);
    }
    clickAddButton() {
        cy.get(this.addEmployeeButton).click();
    }

    //-------------------------------------------------------------------------------------------------
    //Checking search results
    //-------------------------------------------------------------------------------------------------
    checkSearchResults() {
        cy.get(this.employeeTablerows).should('have.length.greaterThan', 0);
    }

    //-------------------------------------------------------------------------------------------------
    //Clicking on employee row
    //-------------------------------------------------------------------------------------------------
    clickEmployeeRow() {
        cy.get(this.employeeTablerows).click();
        cy.wait(20000)
    }
}

export default EmployeeManagementPage;