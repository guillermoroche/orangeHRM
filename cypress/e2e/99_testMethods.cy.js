import EmployeeCreation from '../support/flows/employeeCreationFlow';
import EmployeeSearchFlow from '../support/flows/employeeSearchFlow';
import AccountSearchFlow from '../support/flows/accountSearchFlow';
import UserManagementPage from '../support/pages/Admin/UserManagementPage';
import UserAddPage from '../support/pages/Admin/UserAddPage';
import LoginPage from '../support/pages/LoginPage';
import MainPage from '../support/pages/MainPage';

import {getRandomEmployeeId,getRandomFullName} from '../support/utils';
describe('TEST SANDBOX', () => {
    let loginPage = new LoginPage();
    let mainPage = new MainPage();
    let userManagementPage = new UserManagementPage();
    let accountSearchFlow = new AccountSearchFlow();

    it.skip('Check that UserManagement page loads', () => {
        
        let searchCriteria = {
            username: 'usertobedeleted',
            userRole: 'Admin',
            employeeName: 'nfvg fgmnbf',
            status: 'Enabled'
        }

        loginPage.loginIntoApp();
        accountSearchFlow.accountSearch(searchCriteria);
        userManagementPage.clickDeleteUser(searchCriteria);
        userManagementPage.confirmDeleteUser();


    });

});
