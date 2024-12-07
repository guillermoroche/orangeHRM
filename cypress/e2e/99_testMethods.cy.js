import EmployeeCreation from '../support/flows/employeeCreationFlow';
import EmployeeSearchFlow from '../support/flows/employeeSearchFlow';
import UserManagementPage from '../support/pages/Admin/UserManagementPage';
import UserAddPage from '../support/pages/Admin/UserAddPage';
import LoginPage from '../support/pages/LoginPage';
import MainPage from '../support/pages/MainPage';

import {getRandomEmployeeId,getRandomFullName} from '../support/utils';
describe('TEST SANDBOX', () => {

    it.skip('Check that Employee page loads', () => {
        let employeeCreationFlow = new EmployeeCreation();
        let employeeSearchFlow = new EmployeeSearchFlow();
        let loginPage = new LoginPage();
        loginPage.loginIntoApp();

        let employeeFullName = getRandomFullName();

        const employee = {
            firstname: employeeFullName.firstName,
            middlename: employeeFullName.middleName,
            lastname: employeeFullName.lastName,
            employeeId: getRandomEmployeeId(),
            loginDetails: true,
            username: employeeFullName.firstName + '.' + employeeFullName.lastName,
            password: 'password1',
            confirmedPassword: 'password12',
            accountEnabled: true
        };
        //employeeCreationFlow.createEmployee(employee);
        employeeSearchFlow.searchEmployee({employeeFullName: 'awgaiub awgaiubl'});
    });
    it('Account creation', () => {
        let loginPage = new LoginPage();
        let userAddPage = new UserAddPage();
        let mainPage = new MainPage();
        let userManagementPage = new UserManagementPage();

        loginPage.loginIntoApp();
        mainPage.selectSideMenuOption(mainPage.sideMenuOptions.Admin);
        userManagementPage.clickAddUserButton();
    });
});
