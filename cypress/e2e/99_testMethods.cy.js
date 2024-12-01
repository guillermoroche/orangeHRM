import EmployeeCreation from '../support/flows/employeeCreationFlows';
import LoginPage from '../support/pages/LoginPage';
describe('TEST SANDBOX', () => {

    it('Check that Employee page loads', () => {
        let employeeCreationFlow = new EmployeeCreation();
        let loginPage = new LoginPage();
        loginPage.loginIntoApp();
        const employee = {
            firstname: 'John',
            middlename: 'Doe',
            lastname: 'Smith',
            employeeId: '12345',
            loginDetails: true,
            username: '',
            password: '',
            confirmedPassword: 'password21',
            status: 'Enabled'
        };
        employeeCreationFlow.createEmployee(employee);
        employeeCreationFlow.validateErrorMessages(employee);

    });
});
