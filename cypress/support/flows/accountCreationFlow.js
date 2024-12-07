import LoginPage from '../pages/LoginPage';
import MainPage from '../pages/MainPage';
import UserManagementPage from '../pages/Admin/UserManagementPage';
import UserAddPage  from '../pages/Admin/UserAddPage';


class AccountCreationFlow {
    constructor() {
        this.loginPage = new LoginPage();
        this.mainPage = new MainPage();
        this.userManagementPage = new UserManagementPage();
        this.userAddPage = new UserAddPage();
    }
    /**
     * Creates a new account with the provided account details.
     *
     * @param {Object} accountDetails - The details of the account to be created.
     * @param {string} accountDetails.userRole - The role of the user (ESS/Admin).
     * @param {string} accountDetails.accountStatus - The status of the account (Enabled/Disabled).
     * @param {string} accountDetails.employeeName - The name of the employee.
     * @param {string} accountDetails.username - Username of the account.
     * @param {string} accountDetails.password - The password for the account.
     * @param {string} accountDetails.confirmedPassword - The confirmation of the password.
     */
    createAccount(accountDetails) {
        this.mainPage.selectSideMenuOption(this.mainPage.sideMenuOptions.Admin);
        this.userManagementPage.clickAddUserButton();
        this.userAddPage.checkUserAddPageLoads();

        this.userAddPage.selectUserRole(accountDetails.userRole);
        this.userAddPage.selectAccountStatus(accountDetails.accountStatus);

        this.userAddPage.fillUsername(accountDetails.username);
        this.userAddPage.fillEmployeeName(accountDetails.employeeName);
        this.userAddPage.fillPassword(accountDetails.password);
        this.userAddPage.fillConfirmPassword(accountDetails.confirmedPassword);

        this.userAddPage.clickSaveButton();
    }

}

export default AccountCreationFlow;