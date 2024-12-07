import MainPage from '../pages/MainPage';
import EmployeeManagementPage from '../pages/PIM/EmployeeManagementPage';
import EmployeeCreationPage from '../pages/PIM/EmployeeCreationPage';
import EmployeeProfilePage from '../pages/PIM/EmployeeProfilePage';

class EmployeeCreationFlows {
    constructor() {
        this.mainPage = new MainPage();
        this.employeeManagementPage = new EmployeeManagementPage();
        this.employeeCreationPage = new EmployeeCreationPage();
        this.employeeProfilePage = new EmployeeProfilePage();
    }
    /**
     * Creates a new employee and verifies the employee's basic details.
     *
     * @param {Object} employeeDetails - The details of the employee to be created.
     * @param {string} employeeDetails.firstname - The first name of the employee.
     * @param {string} employeeDetails.middlename - The middle name of the employee.
     * @param {string} employeeDetails.lastname - The last name of the employee.
     * @param {string} employeeDetails.employeeId - The ID of the employee.
     * @param {boolean} employeeDetails.loginDetails - Whether to fill in login details.
     * @param {string} employeeDetails.username - The username for the employee's login.
     * @param {string} employeeDetails.password - The password for the employee's login.
     * @param {string} employeeDetails.confirmedPassword - The confirmed password for the employee's login.
     * @param {string} employeeDetails.accountEnabled - The status of the account to be created.
     */
    createEmployee(employeeDetails) {
        //STEP 1: Navigate to the Employee Management page
        this.mainPage.selectSideMenuOption(this.mainPage.sideMenuOptions.PIM);
        //STEP 2: Click on the Add button
        this.employeeManagementPage.clickAddButton();
        //STEP 3: Fill in the employee full name and id
        this.#fillEmployeeBasicDetails(employeeDetails);
        //STEP 4: Fill in the login details if required
        if (employeeDetails.loginDetails) {
            this.#fillEmployeeLoginDetails(employeeDetails);
        }
        //STEP 5: Click on the Save button
        this.employeeCreationPage.clickSaveButton();
    }

    /**
     * Fills in the basic and mandatory details of an employee on the employee creation page.
     *
     * @param {Object} employeeDetails - The details of the employee.
     * @param {string} employeeDetails.firstname - The first name of the employee.
     * @param {string} employeeDetails.middlename - The middle name of the employee.
     * @param {string} employeeDetails.lastname - The last name of the employee.
     * @param {string} employeeDetails.employeeId - The ID of the employee.
     */
    #fillEmployeeBasicDetails(employeeDetails) {

        cy.log('Filling in the basic details of the employee');
        cy.log(employeeDetails);
        this.employeeCreationPage.fillEmployeeFirstName(employeeDetails.firstName);
        this.employeeCreationPage.fillEmployeeMiddleName(employeeDetails.middleName);
        this.employeeCreationPage.fillEmployeeLastName(employeeDetails.lastName);
        this.employeeCreationPage.fillEmployeeId(employeeDetails.employeeId);

    }

    /**
     * Fills in the employee login details on the employee creation page.
     *
     * @param {Object} employeeDetails - The details of the employee.
     * @param {string} employeeDetails.username - The username of the employee.
     * @param {string} employeeDetails.password - The password of the employee.
     * @param {string} employeeDetails.confirmedPassword - The confirmed password of the employee.
     * @param {string} employeeDetails.accountEnabled - The login status of the employee (enabled/disabled).
     */
    #fillEmployeeLoginDetails(employeeDetails) {

        this.employeeCreationPage.switchLoginDetails(employeeDetails.loginDetails);
        this.employeeCreationPage.fillEmployeeUsername(employeeDetails.username);
        this.employeeCreationPage.fillEmployeePassword(employeeDetails.password);
        this.employeeCreationPage.fillEmployeeConfirmedPassword(employeeDetails.confirmedPassword);
        this.employeeCreationPage.setEmployeeLoginStatus(employeeDetails.accountEnabled);

    }
    

}

export default EmployeeCreationFlows;
