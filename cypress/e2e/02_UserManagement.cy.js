import LoginPage from '../support/pages/LoginPage';
import MainPage from '../support/pages/MainPage';
import UserManagementPage from '../support/pages/Admin/UserManagementPage';

describe('User Management Tests', () => {
    let userManagementPage = new UserManagementPage();

    beforeEach(() => {
        let loginPage = new LoginPage();
        let mainPage = new MainPage();

        loginPage.loginIntoApp();
        mainPage.selectSideMenuOption('Admin');
    });

    it('Check that UserManagement page loads', () => {
        userManagementPage.checkUserManagementPageLoads();
        
    });

});