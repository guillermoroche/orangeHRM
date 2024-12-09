class LoginPage {
    constructor() {
        this.loginURL = '/web/index.php/auth/login';
        this.successURL = '/web/index.php/dashboard/index';
        // Selectors
        this.loginForm = 'div.orangehrm-login-form';

        this.Username = `${this.loginForm} input[name="username"]`; 
        this.Password = `${this.loginForm} input[name="password"]`;
        this.submitButton = `${this.loginForm} button[type="submit"]`;

        this.wrongCredentialsError = `${this.loginForm} div.orangehrm-login-error p.oxd-alert-content-text:contains('Invalid credentials')`;
        this.missingUsernameError = `${this.loginForm} div.oxd-form-row:contains('Username') span.oxd-input-field-error-message:contains('Required')`;
        this.missingPasswordError = `${this.loginForm} div.oxd-form-row:contains('Password') span.oxd-input-field-error-message:contains('Required')`;
        this.disabledAccountError = `${this.loginForm} div.orangehrm-login-error:contains('Account disabled')`;
    }

    visitLoginPage() {
        cy.visit(Cypress.env('URL_base') + this.loginURL);
    }

    checkLoginForm() {
        cy.get(this.loginForm).should('be.visible');
    }

    fillUsername(username) {
        if (username.length > 0) {
            cy.get(this.Username).should('be.visible').type(username);
        }
    }

    fillPassword(password) {
        if (password.length > 0) {
            cy.get(this.Password).should('be.visible').type(password);
        }
    }

    clickLoginButton() {
        cy.get(this.submitButton).should('be.visible').click();
    }

    checkWrongCredentialsError() {
        cy.get(this.wrongCredentialsError).should('be.visible').and('contain', 'Invalid credentials');
        cy.get(this.missingUsernameError).should('not.exist');
        cy.get(this.missingPasswordError).should('not.exist');
        cy.url().should('eq', Cypress.env('URL_base') + this.loginURL);
        
    }

    checkMissingUsernameError() {
        cy.get(this.wrongCredentialsError).should('not.exist'); 
        cy.get(this.missingUsernameError).should('be.visible');
    }

    checkMissingUsernameErrorIsNotVisible() {
        cy.get(this.missingUsernameError).should('not.exist');
    }
    checkMissingPasswordErrorIsNotVisible() {
        cy.get(this.missingPasswordError).should('not.exist');
    }

    checkDisabledAccountError() {
        cy.get(this.disabledAccountError).should('be.visible');
    }

    checkMissingPasswordError() {   
        cy.get(this.wrongCredentialsError).should('not.exist');
        cy.get(this.missingPasswordError).should('be.visible');
    }

    checkDisabledAccountError() {
        cy.get(this.disabledAccountError).should('be.visible');
        //Check that the URL is still the login page
        cy.url().should('eq', Cypress.env('URL_base') + this.loginURL);
    }

    checkSuccessURL() {
        cy.url().should('include', this.successURL);
    }


    //...................................................................................................
    loginIntoApp(username = Cypress.env('AdminUsername'), password = Cypress.env('AdminPassword')) {
        this.visitLoginPage();
        this.checkLoginForm();
        this.fillUsername(username);
        this.fillPassword(password);
        this.clickLoginButton();
    }


}

export default LoginPage;
