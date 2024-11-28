import LoginPage from '../support/pages/LoginPage';
import MainPage from '../support/pages/MainPage';

import EmployeeManagementPage from '../support/pages/PIM/EmployeeManagementPage';
import EmployeeCreationPage from '../support/pages/PIM/EmployeeCreationPage';
import EmployeeProfilePage from '../support/pages/PIM/EmployeeProfilePage';

import UserManagementPage from '../support/pages/Admin/UserManagementPage';

import {getRandomFullName, getRandomEmployeeId} from '../support/utils';

describe('User Management Tests', () => {

    let employeeManagementPage = new EmployeeManagementPage();
    let employeeCreationPage = new EmployeeCreationPage();
    let employeeProfilePage = new EmployeeProfilePage();
    let userManagementPage = new UserManagementPage();

    let loginPage = new LoginPage();
    let mainPage = new MainPage();
    beforeEach(() => {

        loginPage.loginIntoApp();
        mainPage.selectSideMenuOption('PIM');
    });

    it('Check that Employee page loads', () => {

        employeeManagementPage.waitForEmployeeManagementTableToLoad();
        employeeManagementPage.checkEmployeeManagementPageLoads();
    });

    it('Employee Add Button leads to the Employee Add Form', () => {
        employeeManagementPage.clickAddEmployee();
        employeeCreationPage.checkThatEmployeeFormLoads();
    });

    it('Add new employee without login details', () => {
        let employeeFullName = getRandomFullName();
        let employeeId = getRandomEmployeeId();
        employeeManagementPage.clickAddEmployee();
        employeeCreationPage.addEmployee(employeeFullName, employeeId);
        employeeProfilePage.waitForEmployeeProfilePageToLoad();
        employeeProfilePage.checkEmployeeBasicDetails(employeeFullName, employeeId);
    });

    it('Add new employee and search for it using  full name no Id', () => {
        let employeeFullName = getRandomFullName();
        let employeeId = getRandomEmployeeId();
        employeeManagementPage.clickAddEmployee();
        employeeCreationPage.addEmployee(employeeFullName, employeeId);
        employeeProfilePage.waitForEmployeeProfilePageToLoad();
        employeeProfilePage.checkEmployeeBasicDetails(employeeFullName, employeeId);
        mainPage.selectSideMenuOption('PIM');
        employeeManagementPage.fillEmployeeName(employeeFullName);
        employeeManagementPage.clickSearchButton();
        employeeManagementPage.checkSearchResults(employeeFullName, '');
    });

    it('Add new employee and search for it using  full name and Id', () => {
        let employeeFullName = getRandomFullName();
        let employeeId = getRandomEmployeeId();
        employeeManagementPage.clickAddEmployee();
        employeeCreationPage.addEmployee(employeeFullName, employeeId);
        employeeProfilePage.waitForEmployeeProfilePageToLoad();
        employeeProfilePage.checkEmployeeBasicDetails(employeeFullName, employeeId);
        mainPage.selectSideMenuOption('PIM');
        employeeManagementPage.fillEmployeeName(employeeFullName);
        employeeManagementPage.fillEmployeeId(employeeId);
        employeeManagementPage.clickSearchButton();
        employeeManagementPage.checkSearchResults(employeeFullName, employeeId);
    });

    it('Searching by existing name and Id', () => {
        let employeeFullName = getRandomFullName();
        let employeeId = getRandomEmployeeId();
        employeeManagementPage.clickAddEmployee();
        employeeCreationPage.addEmployee(employeeFullName, employeeId);
        employeeProfilePage.waitForEmployeeProfilePageToLoad();
        employeeProfilePage.checkEmployeeBasicDetails(employeeFullName, employeeId);
        mainPage.selectSideMenuOption('PIM');
        employeeManagementPage.fillEmployeeName(employeeFullName);
        employeeManagementPage.fillEmployeeId(employeeId);
        employeeManagementPage.clickSearchButton();
        employeeManagementPage.checkSearchResults(employeeFullName, employeeId);
    });
    
    it('Add new employee with login details and check that can login in the app', () => {
        let employeeFullName = getRandomFullName();
        let employeeId = getRandomEmployeeId();
        let employeeUserName = employeeFullName.firstName + employeeFullName.lastName+employeeId;
        let employeePassword = Cypress.env('NewUserPassword');

        employeeManagementPage.clickAddEmployee(); 
        employeeCreationPage.addEmployee(employeeFullName, employeeId, employeeUserName, employeePassword);
        employeeProfilePage.waitForEmployeeProfilePageToLoad();
        //TODO Need to verify that employee has been created
        mainPage.selectSideMenuOption('PIM');
        employeeManagementPage.fillEmployeeName(employeeFullName);
        employeeManagementPage.fillEmployeeId(employeeId);
        employeeManagementPage.clickSearchButton();
        employeeManagementPage.checkSearchResults(employeeFullName, employeeId);
        //TODO Need to verify that login details are correct (admin panel)
        mainPage.selectSideMenuOption('Admin');
        userManagementPage.fillUsername(employeeUserName);
        userManagementPage.clickSearchButton();
        userManagementPage.checkSearchResults(employeeUserName, employeeFullName);
        //TODO Need to verify that user can login with the new user
        mainPage.userLogout();
        loginPage.loginIntoApp(employeeUserName, employeePassword);
        mainPage.checkMainPage();
    });

    it('Add new employee with disabled account and check that cannot login in the app', () => {
        let employeeFullName = getRandomFullName();
        let employeeId = getRandomEmployeeId();
        let employeeUserName = employeeFullName.firstName + employeeFullName.lastName+employeeId;
        let employeePassword = Cypress.env('NewUserPassword');

        employeeManagementPage.clickAddEmployee(); 
        employeeCreationPage.addEmployee(employeeFullName, employeeId, employeeUserName, employeePassword, 'Disabled');
        employeeProfilePage.waitForEmployeeProfilePageToLoad();
        //TODO Need to verify that employee has been created
        mainPage.selectSideMenuOption('PIM');
        employeeManagementPage.fillEmployeeName(employeeFullName);
        employeeManagementPage.fillEmployeeId(employeeId);
        employeeManagementPage.clickSearchButton();
        employeeManagementPage.checkSearchResults(employeeFullName, employeeId);
        //TODO Need to verify that login details are correct (admin panel)
        mainPage.selectSideMenuOption('Admin');
        userManagementPage.fillUsername(employeeUserName);
        userManagementPage.clickSearchButton();
        userManagementPage.checkSearchResults(employeeUserName, employeeFullName);
        //TODO Need to verify that user CANNOT login with the new username & password
        mainPage.userLogout();
        loginPage.loginIntoApp(employeeUserName, employeePassword);
        loginPage.checkDisabledAccountError();
    });


    it('Cant create 2 employees with the same ID', () => {
        let employeeFullName1 = getRandomFullName();
        let employeeFullName2 = getRandomFullName();
        let employeeId = getRandomEmployeeId();
        employeeManagementPage.clickAddEmployee();
        employeeCreationPage.addEmployee(employeeFullName1, employeeId);
        cy.wait(20000);
        mainPage.selectSideMenuOption('PIM');
        employeeManagementPage.clickAddEmployee();
        employeeCreationPage.addEmployee(employeeFullName2, employeeId);
        employeeCreationPage.checkEmployeeIdAlreadyExistsError();
    });


});