//TODO UserAddPage.js
//web/index.php/admin/saveSystemUser
class UserAddPage {
    constructor() {
        this.userForm = 'div.orangehrm-card-container:contains("Add User")';

        this.formInputFields = {
            username: `${this.userForm} div.oxd-grid-item:contains('Username') input`,

            employeeName: `${this.userForm} div.oxd-grid-item:contains('Employee Name') input`,
            employeeNameOptions: `${this.userForm} div.oxd-grid-item:contains('Employee Name') div.oxd-autocomplete-dropdown div.oxd-autocomplete-option`,

            password: `${this.userForm} div.oxd-grid-item:contains('Password'):nth-child(1) input`,
            confirmPassword: `${this.userForm} div.oxd-grid-item:contains('Confirm Password') input`,

            userRoleDropdown: `${this.userForm} div.oxd-grid-item:contains('User Role') div.oxd-select-wrapper`,
            userRoleDropdownOptions: `${this.userForm} div.oxd-grid-item:contains('User Role') div.oxd-select-dropdown div.oxd-select-option`,

            accountStatusDropdown: `${this.userForm} div.oxd-grid-item:contains('Status') div.oxd-select-wrapper`,
            accountStatusDropdownOptions: `${this.userForm} div.oxd-grid-item:contains('Status') div.oxd-select-dropdown div.oxd-select-option`
        };

        this.formActionButtons = {
            saveButton: `button[type='submit']:contains('Save')`,
            cancelButton: 'button[type="button"]:contains("Cancel")'
        }

        this.userRoleOptions = {
            admin: 'Admin',
            ess: 'ESS'
        }
        this.accountStatusOptions =
        {
            enabled: 'Enabled',
            disabled: 'Disabled'
        }

        this.formErrorMessages = {
            employeeNameRequired: `${this.userForm} div.oxd-input-group:contains('Employee Name') span:contains('Required')`,
            usernameRequired: `${this.userForm} div.oxd-input-group:contains('Username') span:contains('Required')`,
            passwordRequired: `${this.userForm} div.oxd-input-group:contains('Password') span:contains('Required')`,
            passwordsDoNotMatch: `${this.userForm} div.oxd-input-group:contains('Confirm Password') span:contains('Passwords do not match')`,
            statusRequired: `${this.userForm} div.oxd-input-group:contains('Status') span:contains('Required')`,
            userRoleRequired: `${this.userForm} div.oxd-input-group:contains('User Role') span:contains('Required')`,
            formErrorURL: '/web/index.php/admin/saveSystemUser'
        }
    }

    checkUserAddPageLoads() {
        cy.get(this.userForm).should('be.visible');
        cy.get(this.formInputFields.username).should('be.visible');
        cy.get(this.formInputFields.password).should('be.visible');
        cy.get(this.formInputFields.confirmPassword).should('be.visible');

    }

    selectUserRole(userRole) {
        if (userRole.length > 0) {
            cy.get(this.formInputFields.userRoleDropdown).should('be.visible').click();
            cy.get(this.formInputFields.userRoleDropdownOptions).contains(userRole).click();
        }
    }

    selectAccountStatus(accountStatus) {
        if (accountStatus.length > 0) {
            cy.get(this.formInputFields.accountStatusDropdown).should('be.visible').click();
            cy.get(this.formInputFields.accountStatusDropdownOptions).contains(accountStatus).click();
        }
    }

    fillEmployeeName(employeeName) {
        if (employeeName.length > 0) {
            cy.get(this.formInputFields.employeeName).should('be.visible').type(employeeName);
            cy.intercept('GET', '**/web/index.php/api/v2/pim/employees**').as('getEmployees');
            cy.wait('@getEmployees');
            cy.get(this.formInputFields.employeeNameOptions).first().click();
        }
    }

    fillUsername(username) {
        if (username.length > 0) {
            cy.get(this.formInputFields.username).should('be.visible').type(username);
            cy.intercept('GET', '**/web/index.php/api/v2/admin/validation/user-name**').as('validateUsername');
            cy.wait('@validateUsername');
        }
    }

    fillPassword(password) {
        if (password.length > 0) {
            cy.get(this.formInputFields.password).should('be.visible').type(password);
        }
    }

    fillConfirmPassword(confirmPassword) {
        if (confirmPassword.length > 0) {
            cy.get(this.formInputFields.confirmPassword).should('be.visible').type(confirmPassword);
        }
    }

    clickSaveButton() {

        //TODO Avoid hardcoding the URL
        cy.intercept('POST', '**/web/index.php/api/v2/admin/users').as('waitforSave');
        cy.get(this.formActionButtons.saveButton).should('be.visible').click();
        cy.wait('@waitforSave');
    }

    clickCancelButton() {
        cy.get(this.formActionButtons.cancelButton).should('be.visible').click();
    }

    //--------------------------------------------------------------------------------
    // Form Error Messages
    //--------------------------------------------------------------------------------
    checkNameRequiredError() {
        cy.get(this.formErrorMessages.employeeNameRequired).should('be.visible');
    }
    checkUsernameRequiredError() {
        cy.get(this.formErrorMessages.usernameRequired).should('be.visible');
    }
    checkPasswordRequiredError() {
        cy.get(this.formErrorMessages.passwordRequired).should('be.visible');
    }
    checkPasswordsDoNotMatchError() {
        cy.get(this.formErrorMessages.passwordsDoNotMatch).should('be.visible');
    }
    checkStatusRequiredError() {
        cy.get(this.formErrorMessages.statusRequired).should('be.visible');
    }
    checkUserRoleRequiredError() {
        cy.get(this.formErrorMessages.userRoleRequired).should('be.visible');
    }
    //--------------------------------------------------------------------------------
    // Error validation
    //--------------------------------------------------------------------------------
    validateErrorMessages(accountDetails) {
        
        //ERROR 0: Employee Name is required
        if(accountDetails.employeeName === '') {
            this.checkNameRequiredError();
        }

        //ERROR 1: Username is required
        if (accountDetails.username === '') {
            this.checkUsernameRequiredError();
        }
        //ERROR 2: Password is required
        //CORRECTION: This error message is not displayed in the application, accounts can be created without a password
        // just filling the confirmed password field is enough to create an account (LOL)
        
        /*if (accountDetails.password === '') {
            this.checkPasswordRequiredError();
        }*/

        //ERROR 3: Passwords do not match or confirmed password is empty
        if (accountDetails.password !== accountDetails.confirmedPassword && 
            accountDetails.password.length > 0) {

            this.checkPasswordsDoNotMatchError();
        }
        //ERROR 4: Status is required
        if (accountDetails.accountStatus === '') {
            this.checkStatusRequiredError();
        }
        //ERROR 5: User Role is required
        if (accountDetails.userRole === '') {
            this.checkUserRoleRequiredError();
        }
    }

    /**
     * Validates that we are still on the User Add page after an error occurs.
     */
    validateErrorURL() {
        cy.url().should('include', this.formErrorMessages.formErrorURL);
    }

}

export default UserAddPage;