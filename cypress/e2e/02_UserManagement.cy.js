import LoginPage from '../support/pages/LoginPage';
import MainPage from '../support/pages/MainPage';
import UserManagementPage from '../support/pages/Admin/UserManagementPage';
import UserAddPage  from '../support/pages/Admin/UserAddPage';
import UserEditPage  from '../support/pages/Admin/UserEditPage';
import {getRandomFullName, getRandomEmployeeId} from '../support/utils';

import EmployeeCreation from '../support/flows/employeeCreationFlow';
import AccountCreation from '../support/flows/accountCreationFlow';
import AccountSearchFlow from '../support/flows/accountSearchFlow';

describe('User Management Tests', () => {
    
    let userManagementPage = new UserManagementPage();
    let mainPage = new MainPage();
    let userAddPage = new UserAddPage();
    let userEditPage = new UserEditPage();
    let accountCreation = new AccountCreation();
    let employeeCreation = new EmployeeCreation();
    let loginPage = new LoginPage();
    let accountSearchFlow = new AccountSearchFlow();
    beforeEach(() => {

        loginPage.loginIntoApp();
        mainPage.selectSideMenuOption('Admin');
    });

    it('Check that UserManagement page loads', () => {
        userManagementPage.checkUserManagementPageLoads();
        
    });
    it('HAPPYPATH: ESS account (Enabled) can be created for an employee and can be used for login', () => {
        let employeeName = getRandomFullName();
        let employeeId = getRandomEmployeeId();


        let employeeDetails = {
            firstName: employeeName.firstName,
            middleName: employeeName.middleName,
            lastName: employeeName.lastName,
            employeeId: employeeId,
            loginDetails: false,

        }
        let accountDetails = {
            employeeName: employeeDetails.firstName + ' ' + employeeDetails.lastName,
            userRole: 'ESS',
            accountStatus: 'Enabled',
            username: employeeDetails.firstName + '.' + employeeDetails.lastName,
            password: 'mypassword12345',
            confirmedPassword: 'mypassword12345'
        }
        employeeCreation.createEmployee(employeeDetails);
        accountCreation.createAccount(accountDetails);
        mainPage.userLogout();
        loginPage.loginIntoApp(accountDetails.username, accountDetails.password);

        mainPage.checkMainPage(employeeDetails);
        //TODO verify that the user is logged in as an ESS user
        
    });

    it('HAPPYPATH: Admin account (Enabled) can be created for an employee and can be used for login', () => {
        let employeeName = getRandomFullName();
        let employeeId = getRandomEmployeeId();


        let employeeDetails = {
            firstName: employeeName.firstName,
            middleName: employeeName.middleName,
            lastName: employeeName.lastName,
            employeeId: employeeId,
            loginDetails: false,

        }
        let accountDetails = {
            employeeName: employeeDetails.firstName + ' ' + employeeDetails.lastName,
            userRole: 'Admin',
            accountStatus: 'Enabled',
            username: employeeDetails.firstName + '.' + employeeDetails.lastName,
            password: 'mypassword12345',
            confirmedPassword: 'mypassword12345'
        }
        employeeCreation.createEmployee(employeeDetails);
        accountCreation.createAccount(accountDetails);
        mainPage.userLogout();
        loginPage.loginIntoApp(accountDetails.username, accountDetails.password);

        mainPage.checkMainPage(employeeDetails);

        //TODO verify that the user is logged in as an Admin user
        
    });

    it('ESS account (Disabled) can be created for an employee and CANNOT be used for login', () => {
        let employeeName = getRandomFullName();
        let employeeId = getRandomEmployeeId();


        let employeeDetails = {
            firstName: employeeName.firstName,
            middleName: employeeName.middleName,
            lastName: employeeName.lastName,
            employeeId: employeeId,
            loginDetails: false,

        }
        let accountDetails = {
            employeeName: employeeDetails.firstName + ' ' + employeeDetails.lastName,
            userRole: 'ESS',
            accountStatus: 'Disabled',
            username: employeeDetails.firstName + '.' + employeeDetails.lastName,
            password: 'mypassword12345',
            confirmedPassword: 'mypassword12345'
        }
        employeeCreation.createEmployee(employeeDetails);
        accountCreation.createAccount(accountDetails);
        mainPage.userLogout();
        loginPage.loginIntoApp(accountDetails.username, accountDetails.password);

        loginPage.checkDisabledAccountError();
        
    });

    it('Admin account (Disabled) can be created for an employee and CANNOT be used for login', () => {
        let employeeName = getRandomFullName();
        let employeeId = getRandomEmployeeId();


        let employeeDetails = {
            firstName: employeeName.firstName,
            middleName: employeeName.middleName,
            lastName: employeeName.lastName,
            employeeId: employeeId,
            loginDetails: false,

        }
        let accountDetails = {
            employeeName: employeeDetails.firstName + ' ' + employeeDetails.lastName,
            userRole: 'Admin',
            accountStatus: 'Disabled',
            username: employeeDetails.firstName + '.' + employeeDetails.lastName,
            password: 'mypassword12345',
            confirmedPassword: 'mypassword12345'
        }
        employeeCreation.createEmployee(employeeDetails);
        accountCreation.createAccount(accountDetails);
        mainPage.userLogout();
        loginPage.loginIntoApp(accountDetails.username, accountDetails.password);

        loginPage.checkDisabledAccountError();
    });

    it('CANNOT login with a deleted admin account', () => {

        let employeeName = getRandomFullName();
        let employeeId = getRandomEmployeeId();
        let username = employeeName.firstName + '.' + employeeName.lastName;
        let userRole = 'Admin';
        let accountStatus = 'Enabled';

        let employeeDetails = {
            firstName: employeeName.firstName,
            middleName: employeeName.middleName,
            lastName: employeeName.lastName,
            employeeId: employeeId,
            loginDetails: false,

        }
        let accountDetails = {
            employeeName: employeeDetails.firstName + ' ' + employeeDetails.lastName,
            userRole: userRole,
            accountStatus: accountStatus,
            username: username,
            password: 'mypassword12345',
            confirmedPassword: 'mypassword12345'
        }

        let accountSearchDetails = {
            username: username,
            userRole: userRole,
            employeeName: accountDetails.employeeName,
            status: accountStatus
        }

        //STEP 1 - Create an employee
        employeeCreation.createEmployee(employeeDetails);
        //STEP 2 - Create an account for the employee
        accountCreation.createAccount(accountDetails);
        //STEP 3 - Logout and try to login with the account, should be successful
        mainPage.userLogout();
        loginPage.loginIntoApp(accountDetails.username, accountDetails.password);
        mainPage.checkMainPage(employeeDetails);
        //STEP 4 - Logout and login back with the admin account
        mainPage.userLogout();
        loginPage.loginIntoApp();
        //STEP 5 - Navigate to the User Management page and search for the account
        
        accountSearchFlow.accountSearch(accountSearchDetails);
        //STEP 6 - Delete the account
        userManagementPage.clickDeleteUser(accountSearchDetails);
        userManagementPage.confirmDeleteUser();
        //STEP 7 - Try to login with the account, should fail
        mainPage.userLogout();
        loginPage.loginIntoApp(accountDetails.username, accountDetails.password);
        loginPage.checkWrongCredentialsError();
    });

    it('CANNOT login with a deleted ESS account', () => {

        //Test case data generation

        let employeeName = getRandomFullName();
        let employeeId = getRandomEmployeeId();
        let username = employeeName.firstName + '.' + employeeName.lastName;
        let userRole = 'ESS';
        let accountStatus = 'Enabled';

        let employeeDetails = {
            firstName: employeeName.firstName,
            middleName: employeeName.middleName,
            lastName: employeeName.lastName,
            employeeId: employeeId,
            loginDetails: false,

        }
        let accountDetails = {
            employeeName: employeeDetails.firstName + ' ' + employeeDetails.lastName,
            userRole: userRole,
            accountStatus: accountStatus,
            username: username,
            password: 'mypassword12345',
            confirmedPassword: 'mypassword12345'
        }

        let accountSearchDetails = {
            username: username,
            userRole: userRole,
            employeeName: accountDetails.employeeName,
            status: accountStatus
        }

        //STEP 1 - Create an employee
        employeeCreation.createEmployee(employeeDetails);
        //STEP 2 - Create an account for the employee
        accountCreation.createAccount(accountDetails);
        //STEP 3 - Logout and try to login with the account, should be successful
        mainPage.userLogout();
        loginPage.loginIntoApp(accountDetails.username, accountDetails.password);
        mainPage.checkMainPage(employeeDetails);
        //STEP 4 - Logout and login back with the admin account
        mainPage.userLogout();
        loginPage.loginIntoApp();
        //STEP 5 - Navigate to the User Management page and search for the account
        
        accountSearchFlow.accountSearch(accountSearchDetails);
        //STEP 6 - Delete the account
        userManagementPage.clickDeleteUser(accountSearchDetails);
        userManagementPage.confirmDeleteUser();
        //STEP 7 - Try to login with the account, should fail
        mainPage.userLogout();
        loginPage.loginIntoApp(accountDetails.username, accountDetails.password);
        loginPage.checkWrongCredentialsError();

    });
    
    it('CAN login with a disabled account (Admin) after it has been enabled', () => {

        let employeeName = getRandomFullName();
        let employeeId = getRandomEmployeeId();
        let username = employeeName.firstName + '.' + employeeName.lastName;
        let userRole = 'Admin';
        let accountStatus = 'Enabled';

        let employeeDetails = {
            firstName: employeeName.firstName,
            middleName: employeeName.middleName,
            lastName: employeeName.lastName,
            employeeId: employeeId,
            loginDetails: false,

        }
        let accountDetails = {
            employeeName: employeeDetails.firstName + ' ' + employeeDetails.lastName,
            userRole: userRole,
            accountStatus: accountStatus,
            username: username,
            password: 'mypassword12345',
            confirmedPassword: 'mypassword12345'
        }

        let accountSearchDetails = {
            username: username,
            userRole: userRole,
            employeeName: accountDetails.employeeName,
            status: accountStatus
        }

        //STEP 1 - Create an employee
        employeeCreation.createEmployee(employeeDetails);
        //STEP 2 - Create an account for the employee
        accountCreation.createAccount(accountDetails);
        //STEP 3 - Logout and try to login with the account, should be successful
        mainPage.userLogout();
        loginPage.loginIntoApp(accountDetails.username, accountDetails.password);
        mainPage.checkMainPage(employeeDetails);
        //STEP 4 - Logout and login back with the admin account
        mainPage.userLogout();
        loginPage.loginIntoApp();
        //STEP 5 - Navigate to the User Management page and search for the account
        
        accountSearchFlow.accountSearch(accountSearchDetails);
        //cy.intercept('PUT', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/admin/users**').as('saveUser');
        //STEP 6 - Disable the account
        userManagementPage.clickEditUser(accountSearchDetails);
        userEditPage.selectStatus('Disabled');
        userEditPage.clickSaveButton();
        userManagementPage.checkUserManagementPageLoads();
        //STEP 7 - Try to login with the account, should fail
        mainPage.userLogout();
        loginPage.loginIntoApp(accountDetails.username, accountDetails.password);
        loginPage.checkDisabledAccountError();
        //STEP 8 - Login with as Admin and enable the account
        loginPage.loginIntoApp();
        accountSearchFlow.accountSearch(accountSearchDetails);
        userManagementPage.clickEditUser(accountSearchDetails);
        userEditPage.selectStatus('Enabled');
        userEditPage.clickSaveButton();
        userManagementPage.checkUserManagementPageLoads();
        //STEP 9 - Try to login with the account, should be successful
        mainPage.userLogout();
        loginPage.loginIntoApp(accountDetails.username, accountDetails.password);
        mainPage.checkMainPage(employeeDetails);

    });

    it('CAN login with a disabled account (ESS) after it has been enabled', () => {

        let employeeName = getRandomFullName();
        let employeeId = getRandomEmployeeId();
        let username = employeeName.firstName + '.' + employeeName.lastName;
        let userRole = 'ESS';
        let accountStatus = 'Enabled';

        let employeeDetails = {
            firstName: employeeName.firstName,
            middleName: employeeName.middleName,
            lastName: employeeName.lastName,
            employeeId: employeeId,
            loginDetails: false,

        }
        let accountDetails = {
            employeeName: employeeDetails.firstName + ' ' + employeeDetails.lastName,
            userRole: userRole,
            accountStatus: accountStatus,
            username: username,
            password: 'mypassword12345',
            confirmedPassword: 'mypassword12345'
        }

        let accountSearchDetails = {
            username: username,
            userRole: userRole,
            employeeName: accountDetails.employeeName,
            status: accountStatus
        }

        //STEP 1 - Create an employee
        employeeCreation.createEmployee(employeeDetails);
        //STEP 2 - Create an account for the employee
        accountCreation.createAccount(accountDetails);
        //STEP 3 - Logout and try to login with the account, should be successful
        mainPage.userLogout();
        loginPage.loginIntoApp(accountDetails.username, accountDetails.password);
        mainPage.checkMainPage(employeeDetails);
        //STEP 4 - Logout and login back with the admin account
        mainPage.userLogout();
        loginPage.loginIntoApp();
        //STEP 5 - Navigate to the User Management page and search for the account
        
        accountSearchFlow.accountSearch(accountSearchDetails);
        //cy.intercept('PUT', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/admin/users**').as('saveUser');
        //STEP 6 - Disable the account
        userManagementPage.clickEditUser(accountSearchDetails);
        userEditPage.selectStatus('Disabled');
        userEditPage.clickSaveButton();
        userManagementPage.checkUserManagementPageLoads();
        //STEP 7 - Try to login with the account, should fail
        mainPage.userLogout();
        loginPage.loginIntoApp(accountDetails.username, accountDetails.password);
        loginPage.checkDisabledAccountError();
        //STEP 8 - Login with as Admin and enable the account
        loginPage.loginIntoApp();
        accountSearchFlow.accountSearch(accountSearchDetails);
        userManagementPage.clickEditUser(accountSearchDetails);
        userEditPage.selectStatus('Enabled');
        userEditPage.clickSaveButton();
        userManagementPage.checkUserManagementPageLoads();
        //STEP 9 - Try to login with the account, should be successful
        mainPage.userLogout();
        loginPage.loginIntoApp(accountDetails.username, accountDetails.password);
        mainPage.checkMainPage(employeeDetails);

    });

    it('CAN login with an account created as disabled after it has been enabled', () => {

        let employeeName = getRandomFullName();
        let employeeId = getRandomEmployeeId();
        let username = employeeName.firstName + '.' + employeeName.lastName;
        let userRole = 'Admin';
        let accountStatus = 'Disabled';

        let employeeDetails = {
            firstName: employeeName.firstName,
            middleName: employeeName.middleName,
            lastName: employeeName.lastName,
            employeeId: employeeId,
            loginDetails: false,

        }
        let accountDetails = {
            employeeName: employeeDetails.firstName + ' ' + employeeDetails.lastName,
            userRole: userRole,
            accountStatus: accountStatus,
            username: username,
            password: 'mypassword12345',
            confirmedPassword: 'mypassword12345'
        }

        let accountSearchDetails = {
            username: username,
            userRole: userRole,
            employeeName: accountDetails.employeeName,
            status: accountStatus
        }

        //STEP 1 - Create an employee
        employeeCreation.createEmployee(employeeDetails);
        //STEP 2 - Create an account for the employee
        accountCreation.createAccount(accountDetails);
        //STEP 3 - Logout and try to login with the account, should fail
        mainPage.userLogout();
        loginPage.loginIntoApp(accountDetails.username, accountDetails.password);
        loginPage.checkDisabledAccountError();
        //STEP 4 - Login with as Admin and enable the account
        loginPage.loginIntoApp();
        accountSearchFlow.accountSearch(accountSearchDetails);
        userManagementPage.clickEditUser(accountSearchDetails);
        userEditPage.selectStatus('Enabled');
        userEditPage.clickSaveButton();
        userManagementPage.checkUserManagementPageLoads();
        //STEP 5 - Try to login with the account, should be successful
        mainPage.userLogout();
        loginPage.loginIntoApp(accountDetails.username, accountDetails.password);
        mainPage.checkMainPage(employeeDetails);

    });

    it('CANNOT create an account with a duplicate username', () => {
    //TODO: Implement the test case
    });
    it('CANNOT create an account with a duplicate employee name', () => {
    //TODO Implement the test case
    });
    it('If password is changed, the user can login with the new password', () => {
        let employeeName = getRandomFullName();
        let employeeId = getRandomEmployeeId();
        let username = employeeName.firstName + '.' + employeeName.lastName;
        let userRole = 'Admin';
        let accountStatus = 'Enabled';
        let newPassword = 'changedPasswword123';

        let employeeDetails = {
            firstName: employeeName.firstName,
            middleName: employeeName.middleName,
            lastName: employeeName.lastName,
            employeeId: employeeId,
            loginDetails: false,

        }
        let accountDetails = {
            employeeName: employeeDetails.firstName + ' ' + employeeDetails.lastName,
            userRole: userRole,
            accountStatus: accountStatus,
            username: username,
            password: 'mypassword12345',
            confirmedPassword: 'mypassword12345'
        }

        let accountSearchDetails = {
            username: username,
            userRole: userRole,
            employeeName: accountDetails.employeeName,
            status: accountStatus
        }

        //STEP 1 - Create an employee
        employeeCreation.createEmployee(employeeDetails);
        //STEP 2 - Create an account for the employee
        accountCreation.createAccount(accountDetails);
        //STEP 3 - Logout and try to login with the account, should be successful
        mainPage.userLogout();
        loginPage.loginIntoApp(accountDetails.username, accountDetails.password);
        mainPage.checkMainPage(employeeDetails);
        //STEP 4 - Logout and login back with the admin account
        mainPage.userLogout();
        loginPage.loginIntoApp();
        //STEP 5 - Navigate to the User Management page and search for the account
        accountSearchFlow.accountSearch(accountSearchDetails);
        userManagementPage.clickEditUser(accountSearchDetails);
        //STEP 6 - Change the password and save changes
        userEditPage.clickChangePasswordRadioButton();
        userEditPage.fillNewPassword(newPassword);
        userEditPage.fillNewConfirmPassword(newPassword);
        userEditPage.clickSaveButton();
        //STEP 7 - Logout and login with the new password
        mainPage.userLogout();
        loginPage.loginIntoApp(accountDetails.username, newPassword);
        mainPage.checkMainPage(employeeDetails);

    });

    it('If password is changed, the user cannot login with the old password', () => {
        let employeeName = getRandomFullName();
        let employeeId = getRandomEmployeeId();
        let username = employeeName.firstName + '.' + employeeName.lastName;
        let userRole = 'Admin';
        let accountStatus = 'Enabled';
        let newPassword = 'changedPasswword123';

        let employeeDetails = {
            firstName: employeeName.firstName,
            middleName: employeeName.middleName,
            lastName: employeeName.lastName,
            employeeId: employeeId,
            loginDetails: false,

        }
        let accountDetails = {
            employeeName: employeeDetails.firstName + ' ' + employeeDetails.lastName,
            userRole: userRole,
            accountStatus: accountStatus,
            username: username,
            password: 'mypassword12345',
            confirmedPassword: 'mypassword12345'
        }

        let accountSearchDetails = {
            username: username,
            userRole: userRole,
            employeeName: accountDetails.employeeName,
            status: accountStatus
        }

        //STEP 1 - Create an employee
        employeeCreation.createEmployee(employeeDetails);
        //STEP 2 - Create an account for the employee
        accountCreation.createAccount(accountDetails);
        //STEP 3 - Logout and try to login with the account, should be successful
        mainPage.userLogout();
        loginPage.loginIntoApp(accountDetails.username, accountDetails.password);
        mainPage.checkMainPage(employeeDetails);
        //STEP 4 - Logout and login back with the admin account
        mainPage.userLogout();
        loginPage.loginIntoApp();
        //STEP 5 - Navigate to the User Management page and search for the account
        accountSearchFlow.accountSearch(accountSearchDetails);
        userManagementPage.clickEditUser(accountSearchDetails);
        //STEP 6 - Change the password and save changes
        userEditPage.clickChangePasswordRadioButton();
        userEditPage.fillNewPassword(newPassword);
        userEditPage.fillNewConfirmPassword(newPassword);
        userEditPage.clickSaveButton();
        //STEP 7 - Logout and login with the new password
        mainPage.userLogout();
        loginPage.loginIntoApp(accountDetails.username, accountDetails.password);
        loginPage.checkWrongCredentialsError();
    });
    it.only('If the confirmed password does not match the new password, the changes are not saved', () => {
        let employeeName = getRandomFullName();
        let employeeId = getRandomEmployeeId();
        let username = employeeName.firstName + '.' + employeeName.lastName;
        let userRole = 'Admin';
        let accountStatus = 'Enabled';
        let newPassword = 'changedPasswword123';
        let newWrongConfirmPassword = 'wrongPassword1234';

        let employeeDetails = {
            firstName: employeeName.firstName,
            middleName: employeeName.middleName,
            lastName: employeeName.lastName,
            employeeId: employeeId,
            loginDetails: false,

        }
        let accountDetails = {
            employeeName: employeeDetails.firstName + ' ' + ' ' + employeeDetails.lastName,
            userRole: userRole,
            accountStatus: accountStatus,
            username: username,
            password: 'mypassword12345',
            confirmedPassword: 'mypassword12345'
        }

        let accountSearchDetails = {
            username: username,
            userRole: userRole,
            employeeName: accountDetails.employeeName,
            status: accountStatus
        }

        //STEP 1 - Create an employee
        employeeCreation.createEmployee(employeeDetails);
        //STEP 2 - Create an account for the employee
        accountCreation.createAccount(accountDetails);
        //STEP 3 - Logout and try to login with the account, should be successful
        mainPage.userLogout();
        loginPage.loginIntoApp(accountDetails.username, accountDetails.password);
        mainPage.checkMainPage(employeeDetails);
        //STEP 4 - Logout and login back with the admin account
        mainPage.userLogout();
        loginPage.loginIntoApp();
        //STEP 5 - Navigate to the User Management page and search for the account
        accountSearchFlow.accountSearch(accountSearchDetails);
        userManagementPage.clickEditUser(accountSearchDetails);
        //STEP 6 - Change the password and save changes
        userEditPage.checkUserAccount(accountDetails);
        userEditPage.clickChangePasswordRadioButton();
        userEditPage.fillNewPassword(newPassword);
        userEditPage.fillNewConfirmPassword(newWrongConfirmPassword);
        userEditPage.clickSaveButton({error : true});
        //STEP 7 - Check that error message is displayed
        userEditPage.checkPasswordsNotMatchError();
        //STEP 8 - Logout and and check user cant login with the new password
        mainPage.userLogout();
        loginPage.loginIntoApp(accountDetails.username, newPassword);
        loginPage.checkWrongCredentialsError();
        loginPage.loginIntoApp(accountDetails.username, newWrongConfirmPassword);
        loginPage.checkWrongCredentialsError();
        //STEP 9 - Check that the old password still works
        loginPage.loginIntoApp(accountDetails.username, accountDetails.password);
        mainPage.checkMainPage(employeeDetails);
    });


    });