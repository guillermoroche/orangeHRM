class UserEditPage {
    constructor() {
        this.employeeName = 'div.oxd-grid-item:contains("Employee Name") input';

        this.userRoleDropdown = 'div.oxd-grid-item:contains("User Role") div.oxd-select-wrapper',
        this.userRoleDropdownOptions = 'div.oxd-grid-item:contains("User Role") div.oxd-select-dropdown div.oxd-select-option'

        this.accountStatusDropdown = `div.oxd-grid-item:contains('Status') div.oxd-select-wrapper`,
        this.accountStatusDropdownOptions = ` div.oxd-grid-item:contains('Status') div.oxd-select-dropdown div.oxd-select-option`

        this.changePasswordRadioButton = 'div.oxd-grid-item:contains("Change Password") i.bi-check';
        this.passwordRow = 'div.user-password-row';

        this.newPassword = `${this.passwordRow} div.user-password-cell input[type='password']`;
        this.confirmPassword = `${this.passwordRow} div.oxd-grid-item:contains('Confirm Password') input[type='password']`;

        this.passwordsNotMatchError = 'div.oxd-grid-item:contains("Confirm Password") span.oxd-text';

        this.saveButton = `button[type='submit']:contains('Save')`

    }
    checkUserAccount(accountDetails) {
        if (accountDetails.userRole.length > 0) {
            cy.get(this.userRoleDropdown).should('be.visible').and('have.text', accountDetails.userRole);
        }
        if (accountDetails.accountStatus.length > 0) {
            cy.get(this.accountStatusDropdown).should('be.visible').and('have.text', accountDetails.accountStatus);
        }
        if(accountDetails.employeeName.length > 0) {
            cy.get(this.employeeName).should('be.visible').and('have.value', accountDetails.employeeName);
        }
    }

    selectUserRole(userRole) {
        if (userRole.length > 0) {
            cy.get(this.userRoleDropdown).should('be.visible').click();
            cy.get(this.userRoleDropdownOptions).contains(userRole).click();
        }
    }
    selectStatus(status) {
        if (status.length > 0) {
            cy.get(this.accountStatusDropdown).should('be.visible').click();
            cy.get(this.accountStatusDropdownOptions).contains(status).click();
        }
    }

    clickChangePasswordRadioButton() {

        cy.get(this.changePasswordRadioButton).click();
    }

    fillNewPassword(newPassword) {
        if (newPassword.length > 0) {
            cy.get(this.newPassword).should('be.visible').type(newPassword);
        }
    }
    fillNewConfirmPassword(confirmPassword) {
        if (confirmPassword.length > 0) {
            cy.get(this.confirmPassword).should('be.visible').type(confirmPassword);
        }
    }

    checkPasswordsNotMatchError() {
        cy.get(this.passwordsNotMatchError).should('be.visible').contains('Passwords do not match');
    }

    clickSaveButton({ error = false }) {
        cy.get(this.saveButton).click();
        if (!error) {
            cy.intercept('PUT', '**/web/index.php/api/v2/admin/users/**').as('updateUser');
            cy.wait('@updateUser', { timeout: 30000 })
        }

    }
}

export default UserEditPage;