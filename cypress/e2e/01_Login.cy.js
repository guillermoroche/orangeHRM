import LoginPage from '../support/pages/LoginPage';
import MainPage from '../support/pages/MainPage';


describe('Login functionality', () => {
    let loginPage = new LoginPage();
    let mainPage = new MainPage();


    beforeEach(() => {
        loginPage.visitLoginPage();
    });



    it('Login with valid admin credentials', () => {
        loginPage.loginIntoApp();
        loginPage.checkSuccessURL();
        mainPage.checkMainPage();
    });

    it('Login with invalid admin credentials', () => {
        loginPage.loginIntoApp('invalid', 'invalid');
        loginPage.checkWrongCredentialsError();
    });

    it('Login with empty credentials', () => {
        loginPage.loginIntoApp('', '');
        loginPage.checkMissingUsernameError();
        loginPage.checkMissingPasswordError();
    });

    it('Login with empty username', () => {
        loginPage.loginIntoApp('', 'password');
        loginPage.checkMissingUsernameError();
        loginPage.checkMissingPasswordErrorIsNotVisible();
    });

    it('Login with empty password', () => {
        loginPage.loginIntoApp('admin', '');
        loginPage.checkMissingPasswordError();
        loginPage.checkMissingUsernameErrorIsNotVisible();
    });

    it('Logout from the app', () => {
        Cypress.on('uncaught:exception', (err, runnable) => {
            // returning false here prevents Cypress from
            // failing the test
            cy.log('Caught exception: ' + err);
            return false
        })
        loginPage.loginIntoApp();
        mainPage.userLogout();
        loginPage.checkLoginForm();
    });

});