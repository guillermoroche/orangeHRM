import LoginPage from '../support/pages/LoginPage';
import MainPage from '../support/pages/MainPage';
import UserManagementPage from '../support/pages/Admin/UserManagementPage';
import UserAddPage  from '../support/pages/Admin/UserAddPage';

import AccountCreation from '../support/flows/accountCreationFlow';

describe('User Management Tests', () => {
    
    let userManagementPage = new UserManagementPage();
    let mainPage = new MainPage();
    let userAddPage = new UserAddPage();
    let accountCreation = new AccountCreation();
    let loginPage = new LoginPage();
    beforeEach(() => {

        loginPage.loginIntoApp();
        mainPage.selectSideMenuOption('Admin');
    });

    it('Check that UserManagement page loads', () => {
        userManagementPage.checkUserManagementPageLoads();
        
    });

    it('User can be created for an employee', () => {

        let accountDetails = {
            employeeName: '',
            userRole: '',
            accountStatus: '',
            username: '',
            password: 'ds1d122dasd',
            confirmedPassword: ''
        }

        accountCreation.createAccount(accountDetails);
        userAddPage.validateErrorMessages(accountDetails);
        userAddPage.validateErrorURL();
        
    });

    it.only('User can login with the created account', () => {
        let accountDetails = {
            employeeName: 'Marcus Hill',
            userRole: 'ESS',
            accountStatus: 'Enabled',
            username: 'hola123213',
            password: 'mypassword12345',
            confirmedPassword: 'mypassword12345'
        }

        accountCreation.createAccount(accountDetails);
        mainPage.userLogout();
        loginPage.loginIntoApp(accountDetails.username, accountDetails.password);
        mainPage.checkMainPage();
    });

});