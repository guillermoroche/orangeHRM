import LoginPage from '../support/pages/LoginPage';
import MainPage from '../support/pages/MainPage';
import UserManagementPage from '../support/pages/Admin/UserManagementPage';
import UserAddPage  from '../support/pages/Admin/UserAddPage';
import {getRandomFullName, getRandomEmployeeId} from '../support/utils';

import EmployeeCreation from '../support/flows/employeeCreationFlow';
import AccountCreation from '../support/flows/accountCreationFlow';

describe('User Management Tests', () => {
    
    let userManagementPage = new UserManagementPage();
    let mainPage = new MainPage();
    let userAddPage = new UserAddPage();
    let accountCreation = new AccountCreation();
    let employeeCreation = new EmployeeCreation();
    let loginPage = new LoginPage();
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

        mainPage.checkMainPage(employeeDetails);
        
    });

});