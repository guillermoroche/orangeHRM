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
     * @param {string} employeeDetails.status - The status of the account to be created.
     */
    createEmployee(employeeDetails) {
            //STEP 1: Navigate to the Employee Management page
            this.mainPage.selectSideMenuOption(this.mainPage.sideMenuOptions.PIM);
            //STEP 2: Click on the Add button
            this.employeeManagementPage.clickAddButton();
            //STEP 3: Fill in the employee full name and id
            this.fillEmployeeBasicDetails(employeeDetails);
            //STEP 4: Fill in the login details if required
            if(employeeDetails.loginDetails) {
                this.fillEmployeeLoginDetails(employeeDetails);
            }
            //STEP 5: Click on the Save button
            this.employeeCreationPage.clickSaveButton();
    }

    fillEmployeeBasicDetails(employeeDetails) {

        this.employeeCreationPage.fillEmployeeFirstName(employeeDetails.firstname);
        this.employeeCreationPage.fillEmployeeMiddleName(employeeDetails.middlename);
        this.employeeCreationPage.fillEmployeeLastName(employeeDetails.lastname);
        this.employeeCreationPage.fillEmployeeId(employeeDetails.employeeId);
    
    }
    fillEmployeeLoginDetails(employeeDetails) {

        this.employeeCreationPage.switchLoginDetails();
        this.employeeCreationPage.fillEmployeeUsername(employeeDetails.username);
        this.employeeCreationPage.fillEmployeePassword(employeeDetails.password);
        this.employeeCreationPage.fillEmployeeConfirmedPassword(employeeDetails.confirmedPassword);
        this.employeeCreationPage.setEmployeeLoginStatus(employeeDetails.status);

    }

    /**
     * Validates error messages for employee details.
     *
     * @param {Object} employeeDetails - The details of the employee to validate.
     */
    validateErrorMessages(employeeDetails) {
        cy.log('Validating error messages');

        //Empty first name
        if(employeeDetails.firstname === '') {
            cy.log('Validating first name error message');
            this.employeeCreationPage.checkEmployeeFirstNameEmptyError();
        }

        //Empty last name
        if(employeeDetails.lastname === '') {
            cy.log('Validating last name error message');
            this.employeeCreationPage.checkEmployeeLastNameEmptyError();
        }
        if(employeeDetails.loginDetails) {
            if(employeeDetails.username === '') {
                cy.log('Validating username error message');
                this.employeeCreationPage.checkEmployeeUsernameEmptyError();
            }
            if(employeeDetails.password === '') {
                cy.log('Validating password error message');
                this.employeeCreationPage.checkEmployeePasswordError();
            }
            if(employeeDetails.password !== employeeDetails.confirmedPassword) {
                //TODO - Complete this part
                //this.employeeCreationPage.checkEmployeeConfirmedPasswordError();
            }
        }
    }

    validateCreatedEmployee(employeeDetails) {
        cy.log('Validating created employee');
        //TODO - Complete this method
    }

}

export default EmployeeCreationFlows;
