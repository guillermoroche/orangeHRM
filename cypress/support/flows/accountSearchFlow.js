import MainPage from '../pages/MainPage';
import EmployeeManagementPage from '../pages/PIM/EmployeeManagementPage';
import EmployeeCreationPage from '../pages/PIM/EmployeeCreationPage';
import EmployeeProfilePage from '../pages/PIM/EmployeeProfilePage';
import UserManagementPage from '../pages/Admin/UserManagementPage';



class AccountSearchFlow {
    constructor() {
        this.mainPage = new MainPage();
        this.userManagementPage = new UserManagementPage();
        
    }

    accountSearch(searchCriteria) {
        //STEP 1: Navigate to the User Management page
        this.mainPage.selectSideMenuOption(this.mainPage.sideMenuOptions.Admin);
        //STEP 2: Fill in the search criteria
        this.#fillSearchCriteria(searchCriteria);
        this.userManagementPage.clickSearchButton();
        this.userManagementPage.checkSearchResults(searchCriteria);
    }

    #fillSearchCriteria(searchCriteria) {
        this.userManagementPage.fillUsername(searchCriteria.username);
        this.userManagementPage.fillUserRole(searchCriteria.userRole);
        this.userManagementPage.fillEmployeeName(searchCriteria.employeeName);
        this.userManagementPage.fillStatus(searchCriteria.status);
    }

}

export default AccountSearchFlow;