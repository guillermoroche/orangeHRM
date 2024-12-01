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

    testMethod() {
        cy.log('This is a test method');
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
    createEmployee({ firstname,
        middlename,
        lastname,
        employeeId,
        loginDetails,
        username,
        password,
        confirmedPassword,
        status }) {
        cy.log('Creating a new employee');
        // Select the PIM (employeeManagement) option from the side menu
        this.mainPage.selectSideMenuOption('PIM');
        // Click the Add Employee button
        this.employeeManagementPage.clickAddEmployee();
        // Fill out the employee form with mandatory details
        this.employeeCreationPage.fillEmployeeFirstName(firstname);
        this.employeeCreationPage.fillEmployeeMiddleName(middlename);
        this.employeeCreationPage.fillEmployeeLastName(lastname);
        this.employeeCreationPage.fillEmployeeId(employeeId);
        // If the username or password are provided, fill out the login details
        if (loginDetails) {
            this.employeeCreationPage.switchLoginDetails();
            this.employeeCreationPage.fillEmployeeUserName(username);
            this.employeeCreationPage.fillEmployeePassword(password);
            this.employeeCreationPage.fillEmployeeConfirmedPassword(confirmedPassword);
            //TODO - Add the status selection for the employeeAccount
            //this.employeeCreationPage.selectEmployeeStatus(status);
        }
        // Save the employee
        this.employeeCreationPage.clickSaveButton();
    }
    /**
     * Validates the error messages for employee creation form fields.
     * Logs appropriate error messages if any required field is missing or invalid.
     *
     * @param {Object} params - The parameters for validation.
     * @param {string} params.firstname - The first name of the employee.
     * @param {string} params.middlename - The middle name of the employee.
     * @param {string} params.lastname - The last name of the employee.
     * @param {string} params.employeeId - The employee ID.
     * @param {boolean} params.loginDetails - Indicates if login details are provided.
     * @param {string} params.username - The username for login.
     * @param {string} params.password - The password for login.
     * @param {string} params.confirmedPassword - The confirmed password for login.
     * @param {string} params.status - The status of the employee.
     */
    validateErrorMessages({ firstname, middlename, lastname, employeeId, loginDetails, username, password, confirmedPassword, status }) {

        //TODO - Make the corresponding methods to assert the error messages
        //NOTE - The methods should be in the EmployeeCreationPage.js file
        if (!firstname) {
            cy.log('First name is missing');
            this.employeeCreationPage.checkEmployeeFirstNameEmptyError();
        }
        if (!lastname) {
            cy.log('Last name is missing');
            this.employeeCreationPage.checkEmployeeLastNameEmptyError();
        }
        if(loginDetails) {
            if (!username) {
                cy.log('Username is missing');
                this.employeeCreationPage.checkEmployeeUsernameEmptyError();
            }
            if (!password) {
                cy.log('Password is missing');
                this.employeeCreationPage.checkEmployeePasswordError();
            }
            if (!confirmedPassword) {
                cy.log('Confirmed password is missing');
                //this.employeeCreationPage.checkEmployeeConfirmedPasswordError();
            }
            if(password !== confirmedPassword) {
                cy.log('Passwords do not match');
                //this.employeeCreationPage.checkEmployeePasswordMatchError();
            }
        }
    }
        // Save the employee
        //this.employeeCreationPage.clickSave
}

export default EmployeeCreationFlows;
