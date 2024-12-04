import EmployeeCreation from '../support/flows/employeeCreationFlows';
import LoginPage from '../support/pages/LoginPage';
describe('TEST SANDBOX', () => {

    it('Check that Employee page loads', () => {
        let employeeCreationFlow = new EmployeeCreation();
        let loginPage = new LoginPage();
        loginPage.loginIntoApp();
        const employee = {
            firstname: 'Jane',
            middlename: 'Doe',
            lastname: 'dasdasd',
            employeeId: '123456',
            loginDetails: true,
            username: 'dasdasdda',
            password: '',
            confirmedPassword: 'password21',
            status: 'Disabled'
        };
        employeeCreationFlow.createEmployee(employee);
        employeeCreationFlow.validateErrorMessages(employee);

    });
});
